import mongoose from "mongoose";
import { asyncHandaller } from "../utils/asyncHandeller.js";
import { User } from "../models/user.model.js";
import { Userpost } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// create post 
const createPost = asyncHandaller(async (req, res) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      // Extract post details from request body
      const {
         title,
         content,
         projectLink = "",
         tags = "",
         isPublished = false,
         keyWords = "",
         publishedAt = null
      } = req.body;

      const author = req.user._id;

      // Validate required fields
      if ([title, content].some(field => !field.trim())) {
         throw new ApiError(400, "Title and content are required");
      }

      // Check for image
      const postImage = req.files?.image?.[0]?.path;
      if (!postImage) {
         throw new ApiError(400, "Post image is required");
      }

      // Upload image to Cloudinary
      const image = await uploadOnCloudinary(postImage);
      if (!image) {
         throw new ApiError(500, "Image upload failed");
      }

      // Create a new post
      const post = await Userpost.create([{
         title,
         content,
         projectLink,
         tags,
         isPublished,
         image: image.url,
         keyWords,
         publishedAt,
         author
      }], { session });

      // Update the author's posts array
      const updatedUser = await User.findByIdAndUpdate(
         author,
         { $push: { posts: post._id } },
         { session }
      );

      if (!updatedUser) {
         throw new ApiError(404, "User not found");
      }

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Respond with the newly created post
      res.status(201).json({
         message: "Post created successfully",
         post: post[0],
      });
   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
   }
});




// export all functions
export { createPost };