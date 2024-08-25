import mongoose from "mongoose";
import { asyncHandaller } from "../utils/asyncHandeller.js";
import { User } from "../models/user.model.js";
import { Userpost } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/Apiresponce.js";


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
         keyWords = "",
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
      // publishedAt
      const publishedAt = new Date();

      // Create a new post
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

   return res.status(201).json(
      new ApiResponce(201, "Post created successfully")
   );
});
// get all posts
const getAllPostsByUserId = asyncHandaller(async (req, res) => {
   try {
      // Extract the user ID from the request parameters
      const { userId } = req.params;

      // Validate user ID
      if (!mongoose.Types.ObjectId.isValid(userId)) {
         throw new ApiError(400, "Invalid user ID");
      }

      // Fetch all posts associated with the user
      const posts = await Userpost.find({ author: userId }).select("-isPublished -showOnHomePage ");

      // If no posts found, return 404
      if (!posts.length) {
         throw new ApiError(404, "No posts found for this user");
      }

      // Return the list of posts
      return res.status(200).json(new ApiResponce(200, posts, "Posts fetched successfully"));
   } catch (error) {
      console.error("Error fetching posts by user:", error);
      throw new ApiError(500, "Failed to fetch posts");
   }
});
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