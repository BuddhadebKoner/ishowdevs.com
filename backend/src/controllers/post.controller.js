import mongoose from "mongoose";
import { asyncHandaller } from "../utils/asyncHandeller.js";
import { User } from "../models/user.model.js";
import { Userpost } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/Apiresponce.js";


// Create post
const createPost = asyncHandaller(async (req, res) => {
   const session = await mongoose.startSession();
   session.startTransaction();

   try {
      const {
         title,
         content,
         projectLink = "",
         tags = "",
         keyWords = "",
      } = req.body;

      const author = req.user._id;

      if (![title, content].every(field => field.trim())) {
         throw new ApiError(400, "Title and content are required");
      }

      const postImage = req.files?.image?.[0]?.path;
      if (!postImage) {
         throw new ApiError(400, "Post image is required");
      }

      const folderName = `posts-${req.user.username}`;

      const image = await uploadOnCloudinary(postImage, folderName);
      if (!image.url) {
         throw new ApiError(500, "Image upload failed");
      }

      const publishedAt = new Date();

      const post = await Userpost.create([{
         title,
         content,
         projectLink,
         tags,
         image: image.url,
         keyWords,
         publishedAt,
         author
      }], { session });

      const updatedUser = await User.findByIdAndUpdate(
         author,
         { $push: { posts: post[0]._id } },
         { session, new: true }
      );

      if (!updatedUser) {
         throw new ApiError(404, "User not found");
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json(
         new ApiResponce(201, "Post created successfully", post[0])
      );
   } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
   }
});

// get all posts
const getAllPostsByUserId = asyncHandaller(async (req, res) => {
   try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
         throw new ApiError(400, "Invalid user ID");
      }

      const posts = await Userpost.find({ author: userId }).select("-isPublished -showOnHomePage ");

      if (!posts.length) {
         throw new ApiError(404, "No posts found for this user");
      }

      return res.status(200)
         .json(new ApiResponce(200, "Posts fetched successfully", posts));
   } catch (error) {
      return res.status(500).json(new ApiResponce(500, "Failed to fetch posts"));
   }
});
// detele all post
const deletePost = asyncHandaller(async (req, res) => {
   try {
      // Extract post ID from request parameters
      const { postId } = req.params;

      // Validate post ID
      if (!mongoose.Types.ObjectId.isValid(postId)) {
         throw new ApiError(400, "Invalid post ID");
      }

      // Find post by ID and delete it
      const post = await Userpost.findByIdAndDelete(postId);

      // If post not found, return 404
      if (!post) {
         throw new ApiError(404, "Post not found");
      }

      // Respond with success message
      return res.status(200).json({
         message: "Post deleted successfully",
      });

   } catch (error) {
      console.error("Error deleting post:", error);
      throw new ApiError(500, "Failed to delete post");
   }
});



// export all functions
export { createPost, getAllPostsByUserId, deletePost };