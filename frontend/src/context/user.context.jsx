import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, userLogin, userLogout, userRegister } from '../api/user.api';

// Create Context
const UserContext = createContext();

// Provider Component
const UserProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [userdetails, setUserdetails] = useState(null);

   // Check login status on mount
   useEffect(() => {
      const checkLoginStatus = async () => {
         try {
            const res = await getCurrentUser();
            setIsLoggedIn(res?.success || false);
            setUserdetails(res?.message || null);
         } catch (error) {
            console.error('Error checking login status:', error.message || error);
            setIsLoggedIn(false);
         }
      };
      if (!isLoggedIn) {
         checkLoginStatus();
      }
   }, [isLoggedIn]);

   // Handle user login
   const handleLogin = useCallback(async () => {
      try {
         const res = await userLogin(username, password);
         if (res?.success) {
            setIsLoggedIn(true);
            setUserdetails(res?.message || null);
            window.location.reload(); // Reload only on successful login
         } else {
            setIsLoggedIn(false);
         }
      } catch (error) {
         console.error('Error during login:', error.message || error);
         setIsLoggedIn(false);
      }
   }, [username, password]);

   // Handle user logout
   const handleLogout = async () => {
      try {
         await userLogout();
         // Clear cookies, localStorage, and sessionStorage
         document.cookie.split(";").forEach(cookie => {
            const cookieName = cookie.split("=")[0].trim();
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
         });
         localStorage.clear();
         sessionStorage.clear();

         setIsLoggedIn(false);
         setUserdetails(null);
         window.location.reload(); // Reload to reflect logout changes
      } catch (error) {
         console.error('Error during logout:', error.message || error);
         setIsLoggedIn(false);
      }
   };

   const handelRegister = useCallback(async (formData) => {
      console.log("Form Data:", Object.fromEntries(formData.entries()));
      try {
         const res = await userRegister(formData);
         if (res?.success) {
            setIsLoggedIn(true);
            setUserdetails(res?.message || null);
            window.location.reload();
         } else {
            setIsLoggedIn(false);
         }
      } catch (error) {
         console.error('Error during login:', error.message || error);
         setIsLoggedIn(false);
      }
   });

   return (
      <UserContext.Provider value={{
         isLoggedIn,
         setUsername,
         setPassword,
         handleLogin,
         userdetails,
         handleLogout,
         handelRegister
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
