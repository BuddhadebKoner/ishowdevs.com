import axios from 'axios';

// login
const userLogin = async (username, email, password) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/login`, { username, email, password }, {
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

const userLogout = async () => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/logout`, {}, {
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

const userRegister = async (formData) => {
   console.log("FormData:", formData);
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/register`, formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error.message);
   }
}

// refresh the access token up to date on database
const AccessTokenRefreshed = async () => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/refresh_token`, {}, {
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

// get details of the current user (logged in)
const getCurrentUser = async () => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users/current-user`, {
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

// change password (password reset must knowing the old password)
const changePassword = async (oldPassword, newPassword) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/chnage-password`, { oldPassword, newPassword }, {
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

const updateAvatar = async (formData) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/update-avatar`, formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error(error);
   }
}

const updateCoverimage = async (formData) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users/update-coverimage`, formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
         withCredentials: true,
      });
      return response.data;
   } catch (error) {
      console.error(error);
   }
}


export { userLogin, userLogout, userRegister, AccessTokenRefreshed, getCurrentUser, changePassword, updateAvatar, updateCoverimage };
