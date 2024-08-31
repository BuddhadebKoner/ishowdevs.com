import React, { createContext, useContext, useState } from 'react';
import { userLogin, userLogout, userRegister, updateProfileDetails, changePassword, updateAvatar } from '../api/user.api';
import notify from '../utils/notify';
import { PublicContext } from './public.context';
import { useNavigate } from 'react-router-dom';
import { createUserPost, deletePostById, getAllPostsByUserId } from '../api/posts.api';

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
   // avatarUploading state
   const [avatarUploading, setAvatarUploading] = useState(false);
   // create post state
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [projectLink, setProjectLink] = useState('');
   const [tags, setTags] = useState('');
   const [image, setImage] = useState(null);
   const [keywords, setKeywords] = useState('');
   // user posted data
   const [userPosts, setUserPosts] = useState([]);


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

   const handelAvatarChange = async (file) => {
      // Define avatarUploading state
      notify("Hold on few secound", 'info');
      // Set avatarUploading to true when the upload starts
      setAvatarUploading(true);

      const formData = new FormData();
      formData.append('avatar', file);

      try {
         const res = await updateAvatar(formData);
         if (res && res.status === 200) {
            notify("Avatar updated successfully", 'success');
            // console.log("Avatar updated successfully:", res.data.data.avatar);
            setUserData({ ...userData, avatar: res.data.data.avatar });
         } else {
            notify("Failed to update avatar", 'error');
         }
      } catch (error) {
         notify("An error occurred while updating the avatar", 'error');
         console.error('Error uploading avatar:', error);
      } finally {
         setAvatarUploading(false);
      }
   };
   // create post 
   const handelCreatePost = async () => {
      if (!title || !content || !projectLink || !tags || !image || !keywords) {
         notify("Please fill all required fields", 'error');
         return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('projectLink', projectLink);
      formData.append('tags', tags);
      formData.append('image', image);
      formData.append('keywords', keywords);
      try {
         console.log("Post data being sent:", formData);
         const res = await createUserPost(formData);
         if (res && res.status === 201) {
            notify("Post created successfully", 'success');
            // navigate('/myacount/myposts');
         } else if (res && res.status === 400) {
            notify("Title, content, project link, tags, image, and keywords are required", 'error');
         } else if (res && res.status === 404) {
            notify("User not found", 'error');
         } else if (res && res.status === 500) {
            notify("Internal server error", 'error');
         } else {
            notify("Failed to create post", 'error');
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
      }
   };
   // get user post
   const handelGetpost = async (userid) => {
      // console.log("User id:", userid);

      try {
         const res = await getAllPostsByUserId(userid);
         if (res.status === 200) {
            // console.log("Fetched posts:", res.data.data);
            setUserPosts(res.data.data);
         } else {
            notify("Failed to get user posts", 'error');
            // console.error("Error getting all posts by user:", res);
         }
      } catch (error) {
         // notify("Failed to get user posts", 'error');
         console.log("Error getting all posts by user:");
      }
   };
   const handelDeletePost = async (postid) => {
      try {
         const res = await deletePostById(postid);
         if (res.status === 200) {
            notify("Post deleted successfully", 'success');
            // Update the userPosts state by filtering out the deleted post
            setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postid));
         } else {
            notify("Failed to delete post", 'error');
         }
      } catch (error) {
         notify("Failed to delete post", 'error');
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
         handelAvatarChange,
         avatarUploading,
         handelCreatePost,
         setTitle,
         setContent,
         setProjectLink,
         setTags,
         setImage,
         setKeywords,
         handelGetpost,
         userPosts,
         handelDeletePost,
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
