import axios from 'axios';
import axiosInstance from '../config/config';

// Login
const userLogin = async (user) => {
   try {
      const response = await axiosInstance.post('/users/login', user);
      // console.log("Response from server:", response);

      return response;
   } catch (error) {
      return error.response ? error.response.data : error.message;
   }
};

// Logout
const userLogout = async () => {
   try {
      const response = await axiosInstance.post('/users/logout');
      return response;
   } catch (error) {
      console.error(error);
   }
};

// Register
const userRegister = async (user) => {
   try {
      const response = await axiosInstance.post('/users/register', user);
      return response;
   } catch (error) {
      return error.response;
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
      return response;
   } catch (error) {
      return error.response ? error.response.data : error.message;
   }
};

// Change Password
const changePassword = async (oldPassword, newPassword) => {
   try {
      const response = await axiosInstance.post('/users/chnage-password', { oldPassword, newPassword });
      return response;
   } catch (error) {
      console.error(error);
   }
};

const updateAvatar = async (formData) => {
   try {
      const response = await axiosInstance.patch('/users/update-avatar', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      return response;
   } catch (error) {
      console.error('Error uploading avatar:', error);
   }
};



// update profile details
const updateProfileDetails = async (updatedData) => {
   try {
      const response = await axiosInstance.patch('/users/update-myprofile', updatedData);
      return response;
   } catch (error) {
      return error.response ? error.response.data : error.message;
   }
}


export {
   userLogin,
   userLogout,
   userRegister,
   AccessTokenRefreshed,
   getCurrentUser,
   changePassword,
   updateAvatar,
   updateProfileDetails
};
