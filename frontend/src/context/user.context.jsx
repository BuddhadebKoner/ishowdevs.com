import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, userLogin } from '../api/user.api';

// Create Context
const UserContext = createContext();

// Provider Component
const UserProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   // set user state
   const [userdetails, setUserdetails] = useState(null);


   useEffect(() => {

      const checkLoginStatus = async () => {
         try {
            const res = await getCurrentUser();
            setIsLoggedIn(res?.success || false);
            setUserdetails(res?.message || null);
         } catch (error) {
            console.error('Error during login:', error.message || error);
            setIsLoggedIn(false);
         }
      };
      if (!isLoggedIn) {
         checkLoginStatus();
      }

   }, []);

   const handleLogin = async () => {
      try {
         const res = await userLogin(username, password);
         window.location.href = "./";
         setIsLoggedIn(res?.success || false);
      } catch (error) {
         console.error('Error during login:', error.message || error);
         setIsLoggedIn(false);
      }
   };

   return (
      <UserContext.Provider value={{
         isLoggedIn,
         setUsername,
         setPassword,
         handleLogin,
         userdetails
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
