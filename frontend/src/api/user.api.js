import axiosInstance from '../config/config';

// Login
const userLogin = async (username, password) => {
   try {
      const response = await axiosInstance.post('/users/login', { username, password });
      return response.data;
   } catch (error) {
      return error.response ? error.response.data : error.message;
   }
};

// Logout
const userLogout = async () => {
   try {
      const response = await axiosInstance.post('/users/logout');
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// Register
const userRegister = async (formData) => {
   try {
      const response = await axiosInstance.post('/users/register', formData);
      return response.data;
   } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error.message);
   }
};

// Refresh Access Token
const AccessTokenRefreshed = async () => {
   try {
      const response = await axiosInstance.post('/users/refresh_token');
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// Get Current User
const getCurrentUser = async () => {
   try {
      const response = await axiosInstance.get('/users/current-user');
      return response.data;
   } catch (error) {
      console.error(error,"faild to get current user");
   }
};

// Change Password
const changePassword = async (oldPassword, newPassword) => {
   try {
      const response = await axiosInstance.post('/users/change-password', { oldPassword, newPassword });
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// Update Avatar
const updateAvatar = async (formData) => {
   try {
      const response = await axiosInstance.post('/users/update-avatar', formData);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// Update Cover Image
const updateCoverimage = async (formData) => {
   try {
      const response = await axiosInstance.post('/users/update-coverimage', formData);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};


export {
   userLogin,
   userLogout,
   userRegister,
   AccessTokenRefreshed,
   getCurrentUser,
   changePassword,
   updateAvatar,
   updateCoverimage,
};
