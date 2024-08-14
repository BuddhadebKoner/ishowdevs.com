import { asyncHandaller } from "../utils/asyncHandeller.js";
import { ApiError } from "./../utils/ApiError.js";
import { User } from "./../models/user.model.js";
import { uploadOnCloudinary } from "./../utils/cloudinary.js";
import { ApiResponce } from "./../utils/Apiresponce.js";
import jwt from "jsonwebtoken";

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


const registerUser = asyncHandaller(async (req, res) => {
   // Get user details from frontend
   const { fullName, username, email, password, portfolio, mobile, workAs, bio = "", mediaLinks = [], keyWords = [] } = req.body;

   // Validate user details
   if ([fullName, username, email, password, portfolio, mobile, workAs].some(field => !field.trim())) {
      throw new ApiError(400, "Please fill all required fields");
   }

   // Check if user already exists
   const existingUser = await User.findOne({
      $or: [{ email }, { username }]
   });

   if (existingUser) {
      throw new ApiError(409, "User already exists");
   }

   // Check for images
   const avatarLocalPath = req.files?.avatar?.[0]?.path;
   const coverLocalPath = req.files?.coverImage?.[0]?.path;

   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar is required");
   }

   if (!coverLocalPath) {
      throw new ApiError(400, "Cover image is required");
   }

   // Upload images to Cloudinary
   const avatar = await uploadOnCloudinary(avatarLocalPath);
   const coverImage = await uploadOnCloudinary(coverLocalPath);

   if (!avatar) {
      throw new ApiError(400, "Avatar upload failed");
   }
   if (!coverImage) {
      throw new ApiError(500, "Cover image upload failed");
   }

   // Create user object
   const user = await User.create({
      username: username.toLowerCase(),
      fullName,
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage.url,
      portfolio,
      mobile,
      workAs,
      bio,
      mediaLinks,
      keyWords
   });

   // Remove password and refresh token from user response
   const createdUser = await User.findById(user._id).select("-password -refreshToken");

   if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering user");
   }

   // Send response to frontend
   return res.status(201).json(new ApiResponce(201, createdUser, "User registered successfully"));
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
   await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            avatar: avatar.url,
         },
      },
   );

   return res.status(200).json(new ApiResponce(200, "Avatar updated"));
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
   await User.findByIdAndUpdate(
      req.user?._id,
      {
         $set: {
            coverImage: coverImage.url,
         },
      },
   );
   return res
      .status(200)
      .json(new ApiResponce(200, "Cover Image updated"));
});


export {
   registerUser,
   loginUser,
   logoutUser,
   refreshAccessToken,
   chnageCurrentPassword,
   getCurrentUser,
   updateUserAvatar,
   updateUserCoverImage,
};
