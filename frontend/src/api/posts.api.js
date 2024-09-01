import axiosInstance from '../config/config';

// Create post
const createUserPost = async (formData) => {
   try {
      const response = await axiosInstance.post('/posts/create-post', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });
      return response;
   } catch (error) {
      console.error("Error creating post: ", error);
      throw error;
   }
};


// Get all posts by user id
const getAllPostsByUserId = async (userId) => {
   try {
      const response = await axiosInstance.get(`/posts/${userId}/posts`);
      return response;
   } catch (error) {
      return;  
      // console.log("Error accessing all user posts: ");
   }
};

// Delete post by post id
const deletePostById = async (postId) => {
   try {
      const response = await axiosInstance.delete(`/posts/${postId}/delete-post`);
      return response;
   } catch (error) {
      console.error("Error deleting post: ", error);
      throw error;
   }
};

export { createUserPost, getAllPostsByUserId, deletePostById };
