import axios from "axios";

// create post 
const createUserPost = async (formData) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/posts/create-post`, formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
         withCredentials: true,
      });
      return response.message;
   } catch (error) {
      console.error("Error creating post: ", error);
   }
};

const getAllPostsByUserId = async (userId) => {
   try { 
      const response = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/posts/:${userId}/posts`, {
         withCredentials: true,
      });
      return response.message;
   } catch (error) {
      console.error("Error to accessing all user post", error);
   }
};