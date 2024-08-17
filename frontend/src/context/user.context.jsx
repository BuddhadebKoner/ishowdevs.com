import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser, userLogin } from '../api/user.api';

// Create Context
const UserContext = createContext();

// Provider Component
const UserProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   useEffect(() => {
      const checkLoginStatus = async () => {
         try {
            const res = await getCurrentUser();
            setIsLoggedIn(res?.success || false);
         } catch (error) {
            console.error('Error during login:', error.message || error);
            setIsLoggedIn(false);
         }
      };
      checkLoginStatus();
   }, []);

   const handleLogin = async () => {
      try {
         const res = await userLogin(username, password);
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
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
