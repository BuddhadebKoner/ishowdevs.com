import { asyncHandaller } from "../utils/asyncHandeller.js";
import { ApiError } from "./../utils/ApiError.js";
import { User } from "./../models/user.model.js";
import { uploadOnCloudinary } from "./../utils/cloudinary.js";
import { ApiResponce } from "./../utils/Apiresponce.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
   try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
   } catch (error) {
      throw new ApiError(500, "Something went wrong while generating tokens");
   }
};

const registerUser = asyncHandaller(async (req, res) => {
   /*
   1.get user details from frontend
   2.validation of user details , not empty, email format
   3.check if user already exists , email or username qunique
   4.check for images ,check for cover image
   5.upload in cloudinary , avter
   6.create user object - create entry in db
   7.remove password and refresh token from user response
   8.check for user creation
   9.send response to frontend
   */

   // get user details from frontend
   const { fullName, username, email, password } = req.body;
   // console.log("User details from frontend:", {
   //    fullName,
   //    username,
   //    email,
   //    password,
   // });

   // validation of user details
   if (
      [fullName, username, email, password].some(
         (field) => field?.trim() === ""
      )
   ) {
      // console.log("Validation error: Please fill all fields");
      throw new ApiError(400, "Please fill all fields");
   }

   // check if user already exists
   const existedUser = await User.findOne({
      $or: [{ email }, { username }],
   });
   // console.log("Existed user:", existedUser);

   if (existedUser) {
      // console.log("User already exists");
      throw new ApiError(409, "User already exists");
   }

   // check for images
   const avatarLocalPath = req.files?.avatar?.[0]?.path;
   const coverLocalPath = req.files?.coverImage?.[0]?.path;
   // console.log("Avatar local path:", avatarLocalPath);
   // console.log("Cover image local path:", coverLocalPath);

   if (!avatarLocalPath) {
      // console.log("Avatar is required");
      throw new ApiError(400, "Avatar is required");
   }

   // upload in cloudinary
   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = coverLocalPath
      ? await uploadOnCloudinary(coverLocalPath)
      : null;
   // console.log("Avatar upload response:", avatar);
   // console.log("Cover image upload response:", coverImage);

   if (!avatar) {
      // console.log("Avatar is required");
      throw new ApiError(400, "Avatar is required");
   }
   if (coverLocalPath && !coverImage) {
      // console.log("Cover image upload failed");
      throw new ApiError(500, "Cover image upload failed");
   }

   // create user object
   const user = await User.create({
      fullName,
      username: username.toLowerCase(),
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
   });
   // console.log("Created user:", user);

   // remove password and refresh token from user response
   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   );
   // console.log("Created user after selecting fields:", createdUser);

   if (!createdUser) {
      // console.log("Something went wrong while registering user");
      throw new ApiError(500, "something went wrong, while registering user");
   }

   // send response to frontend
   return res
      .status(201)
      .json(new ApiResponce(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandaller(async (req, res) => {
   /*
   req -> data
   username or email
   find the user
   password check
   access and refresh token
   send cookie
   */

   // req -> data
   const { username, email, password } = req.body;
   if (!(username || email)) {
      throw new ApiError(400, "Username or email is required");
   }

   // find the user
   const user = await User.findOne({
      $or: [{ username }, { email }],
   });
   if (!user) {
      throw new ApiError(404, "User does not exist");
   }

   // password check
   const isPasswordValid = await user.isPasswordCorrect(password);
   if (!isPasswordValid) {
      throw new ApiError(401, "Password is incorrect");
   }

   // access and refresh token
   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
   );

   const logedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
   );

   // send cookie
   const options = {
      httpOnly: true,
      secure: true,
   };

   return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
         new ApiResponce(
            200,
            { accessToken, refreshToken, user: logedInUser },
            "User logged in successfully"
         )
      );
});

const logoutUser = asyncHandaller(async (req, res) => {
   /*
   find user
   remove refresh token
   clear cookies
   */
   await User.findByIdAndUpdate(
      req.user._id,
      {
         $unset: {
            refreshToken: 1, 
         },
      },
      {
         new: true,
      }
   );
   const options = {
      httpOnly: true,
      secure: true,
   };
   return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponce(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandaller(async (req, res) => {
   /*
   get refresh token from cookie
   check if refresh token is valid
   generate new access token
   send new access token
   */

   const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
   if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
   }

   try {
      const decodedToken = jwt.verify(
         incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(decodedToken?._id);

      if (!user) {
         throw new ApiError(401, "Invalid refresh token");
      }
      if (incomingRefreshToken !== user.refreshToken) {
         throw new ApiError(401, "Refresh token is expired or used");
      }

      const options = {
         httpOnly: true,
         secure: true,
      };
      const { newAccessToken, newRefreshToken } =
         await generateAccessAndRefreshToken(user._id);

      return res
         .status(200)
         .cookie("accessToken", newAccessToken, options)
         .cookie("refreshToken", newRefreshToken, options)
         .json(
            new ApiResponce(
               200,
               { newAccessToken, newRefreshToken },
               "Access token refreshed"
            )
         );
   } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token");
   }
});

const chnageCurrentPassword = asyncHandaller(async (req, res) => {
   const { oldPassword, newPassword } = req.body;
   const user = await User.findById(req.user?._id);
   const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
   if (!isPasswordCorrect) {
      throw new ApiError(400, "Old password is incorrect");
   }
   user.password = newPassword;
   await user.save({ validateBeforeSave: false });

   return res.status(200).json(new ApiResponce(200, {}, "Password changed"));
});

const getCurrentUser = asyncHandaller(async (req, res) => {
   return res
      .status(200)
      .json(
         new ApiResponce(200, req.user, "current user fetched successfully")
      );
});

const UpdateAcountDetails = asyncHandaller(async (req, res) => {
   const { fullName, email } = req.body;
   if (!fullName || !email) {
      throw new ApiError(400, "Please provide all fields");
   }
   const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: { fullName, email },
      },
      { new: true }
   ).select("-password");

   return res
      .status(200)
      .json(new ApiResponce(200, user, "Account details updated"));
});

const updateUserAvatar = asyncHandaller(async (req, res) => {
   /*
   check for image
   upload image in cloudinary
   update user avatar
   */

   const avatarLocalPath = req.file?.path;
   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar is required");
   }
   const avatar = await uploadOnCloudinary(avatarLocalPath);

   if (!avatar.url) {
      throw new ApiError(500, "Error While uploading Avatar");
   }
   const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            avatar: avatar.url,
         },
      },
      { new: true }.select("-password")
   );

   return res.status(200).json(new ApiResponce(200, user, "Avatar updated"));
});

const updateUserCoverImage = asyncHandaller(async (req, res) => {
   /*
   check for image
   upload image in cloudinary
   update user avatar
   */

   const coverLocalPath = req.file?.path;
   if (!coverLocalPath) {
      throw new ApiError(400, "Avatar is required");
   }
   const coverImage = await uploadOnCloudinary(coverLocalPath);

   if (!coverImage.url) {
      throw new ApiError(500, "Error While uploading cover image");
   }
   const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            coverImage: coverImage.url,
         },
      },
      { new: true }.select("-password")
   );
   return res
      .status(200)
      .json(new ApiResponce(200, user, "Cover Image updated"));
});

const getUserChanalProfile = asyncHandaller(async (req, res) => {
   const { username } = req.params;

   if (!username?.trim) {
      throw new ApiError(400, "Username is missing");
   }

   const channel = await User.aggregate([
      {
         $match: {
            username: username?.toLowerCase(),
         },
      },
      {
         $lookup: {
            from: "subscriptons",
            localField: "_id",
            foreignField: "channel",
            as: "subscribers",
         },
      },
      {
         $lookup: {
            from: "subscriptons",
            localField: "_id",
            foreignField: "subscriber",
            as: "subscribedTo",
         },
      },
      {
         $addFields: {
            subscribersCount: {
               $size: "$subscribers",
            },
            channelsSubscribedToCount: {
               $size: "$subscribedTo",
            },
            isSubscribed: {
               $cond: {
                  if: {
                     $in: [req.user?._id, "$subscribers.subscriber"],
                  },
                  then: true,
                  else: false,
               },
            },
         },
      },
      {
         $project: {
            fullName: 1,
            username: 1,
            subscribersCount: 1,
            channelsSubscribedToCount: 1,
            isSubscribed: 1,
            avatar: 1,
            coverImage: 1,
            email: 1,
         },
      },
   ]);

   if (!channel?.length) {
      throw new ApiError(404, "Channel not found");
   }

   return res
      .status(200)
      .json(
         new ApiResponce(
            200,
            channel[0],
            "Channel profile fetched successfully"
         )
      );
});



export {
   registerUser,
   loginUser,
   logoutUser,
   refreshAccessToken,
   chnageCurrentPassword,
   getCurrentUser,
   UpdateAcountDetails,
   updateUserAvatar,
   updateUserCoverImage,
   getUserChanalProfile,
};
