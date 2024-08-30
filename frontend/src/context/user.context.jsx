import React, { createContext, useContext, useState } from 'react';
import { userLogin, userLogout, userRegister, updateProfileDetails, changePassword } from '../api/user.api';
import notify from '../utils/notify';
import { PublicContext } from './public.context';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   // puclic context api access
   const { isLoggedIn, setIsLoggedIn, userData, setUserData } = useContext(PublicContext);
   // register user state
   const [fullName, setFullName] = React.useState('');
   const [username, setUsername] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   // updated user details
   const [updatedData, setUpdatedData] = React.useState('');
   // login user state
   const [loginUsername, setLoginUsername] = React.useState('');
   const [loginPassword, setLoginPassword] = React.useState('');
   // chnage password 
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');

   // page navigation 
   const navigate = useNavigate();

   // Validate user input fields
   const registerValidateFields = () => {
      if (!fullName || !username || !email || !password) {
         notify("Please fill all required fields");
         return false;
      }
      if (fullName.length > 30 || username.length > 30 || email.length > 30 || password.length > 30) {
         notify("Fields must be less than 30 characters");
         return false;
      }
      if (/\s/.test(username)) {
         notify("Username cannot contain spaces");
         return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         notify("Please enter a valid email address");
         return false;
      }
      return true;
   };
   // Handle user registration
   const handelUserRegister = async () => {
      if (!registerValidateFields()) {
         return;
      }

      const user = {
         fullName,
         username,
         email,
         password,
      };

      try {
         const res = await userRegister(user);
         if (res.status === 201) {
            notify("User registered successfully", 'success');
            navigate('/login');
            console.log("User registered successfully:", res);
         } else if (res.status === 400) {
            notify("Please fill all required fields", 'error');
         } else if (res.status === 409) {
            notify("User already exists", 'error');
         } else {
            notify("Registration error", 'error');
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
      }
   };
   // Validate user login fields
   const LoginValidateFields = () => {
      if (!loginUsername || !loginPassword) {
         notify("Please fill all required fields");
         return false;
      }
      if (loginUsername.length > 30 || loginPassword.length > 30) {
         notify("Fields must be less than 30 characters");
         return false;
      }
      if (/\s/.test(loginUsername)) {
         notify("Username cannot contain spaces");
         return false;
      }
      return true;
   };
   // Handle user login
   const handelLogin = async () => {
      if (!LoginValidateFields()) {
         return;
      }

      const user = {
         username: loginUsername,
         password: loginPassword,
      };

      // console.log("User data being sent:", user);

      try {
         const res = await userLogin(user);
         // console.log("Response from server:", res);

         if (res && res.status) {
            if (res.status === 200) {
               notify("User logged in successfully", 'success');
               navigate('/myacount');
               // console.log("User logged in successfully:", res.data.data);
               const UserData = res.data.data.user;
               setUserData(UserData);
               setIsLoggedIn(true);
            } else if (res.status === 400) {
               notify("Username or email is required", 'error');
            } else if (res.status === 404) {
               notify("User does not exist", 'error');
            } else if (res.status === 401) {
               notify("Password is incorrect", 'error');
            } else {
               notify("Login error", 'error');
            }
         } else {
            notify("Password is incorrect", 'error');
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
         console.error("Error during login:", error);
      }
   };
   // Handle logout
   const handelLogout = async () => {
      try {
         if (!isLoggedIn) {
            notify("User is already logged out", 'info');
            return;
         }

         const res = await userLogout();
         if (res && res.status === 200) {
            notify("User logged out successfully", 'success');
            setIsLoggedIn(false);
         } else {
            console.error("Failed to logout: unexpected response", res);
            notify("Failed to logout. Please try again.", 'error');
         }
      } catch (error) {
         console.error("Failed to logout:", error);
         notify("An error occurred during logout. Please try again.", 'error');
      }
   };

   const isValidURL = (str) => {
      try {
         new URL(str);
         return true;
      } catch (_) {
         return false;
      }
   };

   // Handle profile update
   const handelProfileUpdate = async (updatedData) => {
      const { fullName, mobile, portfolio, keyWords } = updatedData;

      // Check if fullName is empty
      if (!fullName) {
         notify("Full name cannot be empty", 'error');
         return;
      }

      // Check length constraints
      if (fullName.length > 30) {
         notify("Full name must be less than 30 characters", 'error');
         return;
      }

      if (mobile && mobile.length > 10) {
         notify("Mobile number must be less than 10 digits", 'error');
         return;
      }

      if (keyWords && keyWords.length > 30) {
         notify("Keywords must be less than 30 characters", 'error');
         return;
      }

      // Validate portfolio URL
      if (portfolio && !isValidURL(portfolio)) {
         notify("Portfolio must be a valid URL", 'error');
         return;
      }

      // Validate keywords - must be a comma-separated string with a maximum of 4 words
      const keyWordsArray = keyWords.split(',').map(word => word.trim());
      if (keyWordsArray.length > 4) {
         notify("Keywords must be a comma-separated string with a maximum of 4 words", 'error');
         return;
      }

      // Call the update function
      const res = await updateProfileDetails(updatedData);

      // Handle the response
      if (res && res.status === 200) {
         notify("Profile updated successfully", 'success');
      }
      else if (res && res.status === 400) {
         notify("Full name and work as are required", 'error');
      } else if (res && res.status === 404) {
         notify("User not found", 'error');
      } else if (res && res.status === 500) {
         notify("Internal server error", 'error');
      } else if (res && res.status === 401) {
         notify("Unauthorized", 'error');
      }
      else {
         notify("Failed to update profile", 'error');
      }
   };
   // chnage password
   const handelPasswordChange = async () => {
      if (!oldPassword || !newPassword) {
         notify("Please fill all required fields", 'error');
         return;
      }
      if (oldPassword === newPassword) {
         notify("Old password and new password cannot be the same", 'error');
         return;
      }
      try {
         // call the password change 
         const res = await changePassword(oldPassword, newPassword);
         if (res && res.status === 200) {
            notify("Password changed successfully", 'success');
            notify("keep your new password safe", 'info');
            navigate('/myacount');
         } else if (res && res.status === 400) {
            notify("Old password and new password are required", 'error');
         } else if (res && res.status === 401) {
            notify("Password is incorrect", 'error');
         } else if (res && res.status === 404) {
            notify("User not found", 'error');
         } else if (res && res.status === 500) {
            notify("Internal server error", 'error');
         } else if (res && res.status === 403) {
            notify("Wrong Old password", 'error');
         } else {
            notify("Failed to change password", 'error');
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
      }
   };




   return (
      <UserContext.Provider value={{
         setFullName,
         setUsername,
         setEmail,
         setPassword,
         handelUserRegister,
         setLoginUsername,
         setLoginPassword,
         handelLogin,
         handelLogout,
         handelProfileUpdate,
         setOldPassword,
         setNewPassword,
         handelPasswordChange,
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
