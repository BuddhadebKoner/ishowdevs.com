import React, { createContext, useState, useEffect } from 'react';
import { changePassword, getCurrentUser, userLogin, userLogout, userRegister } from '../api/user.api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   // user details data
   const [userdetails, setUserdetails] = useState(null);

   useEffect(() => {
      if (!isLoggedIn) {
         const checkLoginStatus = async () => {
            try {
               const res = await getCurrentUser();
               if (res?.success && res?.message.isActive) {
                  setUserdetails((prevDetails) => (prevDetails === res.message ? prevDetails : res.message));
                  setIsLoggedIn(true);
               } else {
                  setIsLoggedIn(false);
               }
            } catch (error) {
               console.error('Error checking login status:', error.message || error);
               setIsLoggedIn(false);
            }
         };
         checkLoginStatus();
      }
   }, [isLoggedIn]);

   const handleLogin = async () => {
      try {
         const res = await userLogin(username, password);

         if (res?.success) {
            if (res.message.isActive === false) {
               console.log("User is not active, contact the admin");
               setIsLoggedIn(false);
            } else {
               setUserdetails(prevDetails => prevDetails === res.message ? prevDetails : res.message);
               setIsLoggedIn(true);
            }
         } else {
            handleLoginFailure(res);
         }
      } catch (error) {
         console.error('Error during login:', error.message || error);
         setIsLoggedIn(false);
      }
   };

   const handleLoginFailure = (res) => {
      if (res?.error === "INCORRECT_PASSWORD") {
         console.error('Incorrect password');
      } else if (res?.error === "USER_NOT_FOUND") {
         console.error('User not found');
      } else if (res?.error === "ACCOUNT_LOCKED") {
         console.error('Account is locked');
      } else {
         console.error('Login failed');
      }
      setIsLoggedIn(false);
   };

   const handleLogout = async () => {
      try {
         await userLogout();
         document.cookie.split(";").forEach(cookie => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
         });
         localStorage.clear();
         sessionStorage.clear();

         setIsLoggedIn(false);
         setUserdetails(null);
      } catch (error) {
         console.error('Error during logout:', error.message || error);
         setIsLoggedIn(false);
      }
   };

   const handleRegister = async (formData) => {
      console.log("Form Data:", Object.fromEntries(formData.entries()));
      try {
         const res = await userRegister(formData);
         if (res?.success) {
            setIsLoggedIn(true);
            setUserdetails((prevDetails) => (prevDetails === res.message ? prevDetails : res.message));
         } else {
            setIsLoggedIn(false);
         }
      } catch (error) {
         console.error('Error during registration:', error.message || error);
         setIsLoggedIn(false);
      }
   };

   const handelChangepassword = async () => {
      try {
         const res = await changePassword(oldPassword, newPassword);
         if (res?.success) {
            await handleLogout();
            console.log("Password changed successfully");
         } else {
            console.log("Password change failed");
         }
      } catch (error) {
         console.error('Error during password change:', error.message || error);
      }
   }



   return (
      <UserContext.Provider value={{
         isLoggedIn,
         setUsername,
         setPassword,
         setOldPassword,
         setNewPassword,
         handleLogin,
         userdetails,
         handleLogout,
         handleRegister,
         handelChangepassword,
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
