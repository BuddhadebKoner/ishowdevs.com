import React, { createContext, useContext, useMemo, useState } from 'react';
import { userLogin, userLogout, userRegister, updateProfileDetails, changePassword, updateAvatar, deleteAccount } from '../api/user.api';
import notify from '../utils/notify';
import { PublicContext } from './public.context';
import { useNavigate } from 'react-router-dom';
import { createUserPost, deletePostById, getAllPostsByUserId } from '../api/posts.api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   // puclic context api access
   const { isLoggedIn, setIsLoggedIn, userData, setUserData, setLoading, } = useContext(PublicContext);
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
   // avatarUploading state
   const [avatarUploading, setAvatarUploading] = useState(false);
   // create post state
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [projectLink, setProjectLink] = useState('');
   const [tags, setTags] = useState('');
   const [image, setImage] = useState(null);
   const [keyWords, setKeyWords] = useState('');
   // user posted data
   const [userPosts, setUserPosts] = useState([]);


   // page navigation 
   const navigate = useNavigate();

   // Validate user input fields
   const registerValidateFields = () => {
      if (!fullName || !username || !email || !password) {
         notify("Please fill all required fields");
         setLoading(false);
         return false;
      }
      if (fullName.length > 30 || username.length > 30 || email.length > 30 || password.length > 30) {
         notify("Fields must be less than 30 characters");
         setLoading(false);
         return false;
      }
      if (/\s/.test(username)) {
         notify("Username cannot contain spaces");
         setLoading(false);
         return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         notify("Please enter a valid email address");
         setLoading(false);
         return false;
      }
      return true;
   };
   // Handle user registration
   const handelUserRegister = async () => {
      setLoading(true);
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
            setLoading(false);
            console.log("User registered successfully:", res);
         } else if (res.status === 400) {
            notify("Please fill all required fields", 'error');
            setLoading(false);
         } else if (res.status === 409) {
            notify("User already exists", 'error');
            setLoading(false);
         } else {
            notify("Registration error", 'error');
            setLoading(false);
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
         setLoading(false);
      }
   };
   // Validate user login fields
   const LoginValidateFields = () => {
      if (!loginUsername || !loginPassword) {
         notify("Please fill all required fields");
         setLoading(false);
         return false;
      }
      if (loginUsername.length > 30 || loginPassword.length > 30) {
         notify("Fields must be less than 30 characters");
         setLoading(false);
         return false;
      }
      if (/\s/.test(loginUsername)) {
         notify("Username cannot contain spaces");
         setLoading(false);
         return false;
      }
      return true;
   };
   // Handle user login
   const handelLogin = async () => {
      setLoading(true);
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
               // console.log("User logged in successfully:", res);
               const UserData = res.data.data.user;
               setUserData(UserData);
               setIsLoggedIn(true);
               setLoading(false);
            } else if (res.status === 400) {
               notify("Username or email is required", 'error');
               setLoading(false);
            } else if (res.status === 404) {
               notify("User does not exist", 'error');
               setLoading(false);
            } else if (res.status === 401) {
               notify("Password is incorrect", 'error');
               setLoading(false);
            } else if (res.status === 405) {
               notify("User is deleted, Contact to admin for recover account", 'error');
               setLoading(false);
            }
            else {
               notify("Login error", 'error');
               setLoading(false);
            }
         } else {
            notify("Password is incorrect", 'error');
            setLoading(false);
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
         setLoading(false);
         console.error("Error during login:", error);
      }
   };
   // Handle logout
   const handelLogout = async () => {
      setLoading(true);
      try {
         if (!isLoggedIn) {
            notify("User is already logged out", 'info');
            setLoading(false);
            return;
         }

         const res = await userLogout();
         if (res && res.status === 200) {
            notify("User logged out successfully", 'success');
            setIsLoggedIn(false);
            setLoading(false);
         } else {
            console.error("Failed to logout: unexpected response", res);
            notify("Failed to logout. Please try again.", 'error');
            setLoading(false);
         }
      } catch (error) {
         console.error("Failed to logout:", error);
         notify("An error occurred during logout. Please try again.", 'error');
         setLoading(false);
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
      setLoading(true);
      const { fullName, mobile, portfolio, keyWords } = updatedData;

      // Check if fullName is empty
      if (!fullName) {
         notify("Full name cannot be empty", 'error');
         setLoading(false);
         return;
      }

      // Check length constraints
      if (fullName.length > 30) {
         notify("Full name must be less than 30 characters", 'error');
         setLoading(false);
         return;
      }

      if (mobile && mobile.length > 10) {
         notify("Mobile number must be less than 10 digits", 'error');
         setLoading(false);
         return;
      }

      if (keyWords && keyWords.length > 30) {
         notify("Keywords must be less than 30 characters", 'error');
         setLoading(false);
         return;
      }

      // Validate portfolio URL
      if (portfolio && !isValidURL(portfolio)) {
         notify("Portfolio must be a valid URL", 'error');
         setLoading(false);
         return;
      }

      // Validate keywords - must be a comma-separated string with a maximum of 4 words
      const keyWordsArray = keyWords.split(',').map(word => word.trim());
      if (keyWordsArray.length > 4) {
         notify("Keywords must be a comma-separated string with a maximum of 4 words", 'error');
         setLoading(false);
         return;
      }

      // Call the update function
      const res = await updateProfileDetails(updatedData);

      // Handle the response
      if (res && res.status === 200) {
         notify("Profile updated successfully", 'success');
         setLoading(false);
      }
      else if (res && res.status === 400) {
         notify("Full name and work as are required", 'error');
         setLoading(false);
      } else if (res && res.status === 404) {
         notify("User not found", 'error');
         setLoading(false);
      } else if (res && res.status === 500) {
         notify("Internal server error", 'error');
         setLoading(false);
      } else if (res && res.status === 401) {
         notify("Unauthorized", 'error');
         setLoading(false);
      }
      else {
         notify("Failed to update profile", 'error');
         setLoading(false);
      }
   };
   // chnage password
   const handelPasswordChange = async () => {
      setLoading(true);
      if (!oldPassword || !newPassword) {
         notify("Please fill all required fields", 'error');
         setLoading(false);
         return;
      }
      if (oldPassword === newPassword) {
         notify("Old password and new password cannot be the same", 'error');
         setLoading(false);
         return;
      }
      try {
         // call the password change 
         const res = await changePassword(oldPassword, newPassword);
         if (res && res.status === 200) {
            notify("Password changed successfully", 'success');
            notify("keep your new password safe", 'info');
            navigate('/myacount');
            setLoading(false);
         } else if (res && res.status === 400) {
            notify("Old password and new password are required", 'error');
            setLoading(false);
         } else if (res && res.status === 401) {
            notify("Password is incorrect", 'error');
            setLoading(false);
         } else if (res && res.status === 404) {
            notify("User not found", 'error');
            setLoading(false);
         } else if (res && res.status === 500) {
            notify("Internal server error", 'error');
            setLoading(false);
         } else if (res && res.status === 403) {
            notify("Wrong Old password", 'error');
            setLoading(false);
         } else {
            notify("Failed to change password", 'error');
            setLoading(false);
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
         setLoading(false);
      }
   };

   const handelAvatarChange = async (file) => {
      setLoading(true);
      // Define avatarUploading state
      // Set avatarUploading to true when the upload starts
      setAvatarUploading(true);

      const formData = new FormData();
      formData.append('avatar', file);

      try {
         const res = await updateAvatar(formData);
         if (res && res.status === 200) {
            notify("Avatar updated successfully", 'success');
            setLoading(false);
            // console.log("Avatar updated successfully:", res.data.data.avatar);
            setUserData({ ...userData, avatar: res.data.data.avatar });
         } else {
            notify("Failed to update avatar", 'error');
            setLoading(false);
         }
      } catch (error) {
         notify("An error occurred while updating the avatar", 'error');
         console.error('Error uploading avatar:', error);
         setLoading(false);
      } finally {
         setAvatarUploading(false);
         setLoading(false);
      }
   };
   // create post 
   const handelCreatePost = async () => {
      setLoading(true);
      if (!title || !content || !projectLink || !tags || !image || !keyWords) {
         notify("Please fill all required fields", 'error');
         setLoading(false);
         return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('projectLink', projectLink);
      formData.append('tags', tags);
      formData.append('image', image);
      formData.append('keyWords', keyWords);
      try {
         console.log("Post data being sent:", formData);
         const res = await createUserPost(formData);
         if (res && res.status === 201) {
            notify("Post created successfully", 'success');
            setLoading(false);
         } else if (res && res.status === 400) {
            notify("Title, content, project link, tags, image, and keywords are required", 'error');
            setLoading(false);
         } else if (res && res.status === 404) {
            notify("User not found", 'error');
            setLoading(false);
         } else if (res && res.status === 500) {
            notify("Internal server error", 'error');
            setLoading(false);
         } else {
            notify("Failed to create post", 'error');
            setLoading(false);
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
         setLoading(false);
      }
   };
   // get user post
   const handelGetpost = async (userid) => {
      setLoading(true);
      // console.log("User id:", userid);

      try {
         const res = await getAllPostsByUserId(userid);
         if (res.status === 200) {
            // console.log("Fetched posts:", res.data.data);
            setUserPosts(res.data.data);
            setLoading(false);
         } else {
            notify("Failed to get user posts", 'error');
            // console.error("Error getting all posts by user:", res);
            setLoading(false);
         }
      } catch (error) {
         // notify("Failed to get user posts", 'error');
         console.log("Error getting all posts by user:");
         setLoading(false);
      }
   };
   const handelDeletePost = async (postid) => {
      setLoading(true);
      try {
         const res = await deletePostById(postid);
         if (res.status === 200) {
            notify("Post deleted successfully", 'success');
            setLoading(false);
            // Update the userPosts state by filtering out the deleted post
            setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postid));
         } else {
            notify("Failed to delete post", 'error');
            setLoading(false);
         }
      } catch (error) {
         notify("Failed to delete post", 'error');
         setLoading(false);
      }
   };
   // delete account
   const handelDeleteAccount = async () => {
      setLoading(true);
      try {
         const res = await deleteAccount();
         // console.log("Response from server:", res);
         if (res && res.status === 200) {
            notify("Account deleted successfully", 'success');
            navigate('/');
            setIsLoggedIn(false);
            setLoading(false);
         } else {
            notify("Failed to delete account", 'error');
            setLoading(false);
         }
      } catch (error) {
         notify("An error occurred while deleting the account", 'error');
         console.error('Error deleting account:', error);
         setLoading(false);
      }
   }



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
         handelAvatarChange,
         avatarUploading,
         handelCreatePost,
         setTitle,
         setContent,
         setProjectLink,
         setTags,
         setImage,
         setKeyWords,
         handelGetpost,
         userPosts,
         handelDeletePost,
         handelDeleteAccount,
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
