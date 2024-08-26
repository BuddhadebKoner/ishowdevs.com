import React, { createContext, useEffect, useState, useMemo } from 'react';
import { homeContents } from '../api/admin.api';
import { getCurrentUser } from '../api/user.api';

const PublicContext = createContext();

const PublicProvider = ({ children }) => {
   const [bigDealOffer, setBigDealOffer] = useState([]);
   const [devalopers, setDevalopers] = useState([]);
   const [userpost, setUserpost] = useState([]);
   const [user, setUser] = useState(null); // State to store user info
   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

   // Fetch home contents data
   const handleHomeContents = async () => {
      try {
         const res = await homeContents();
         setBigDealOffer(res.bigDealOffer);
         setDevalopers(res.devalopers);
         setUserpost(res.userpost);
      } catch (error) {
         console.error("Error accessing home contents: ", error);
      }
   };

   // Check if user is logged in and get user details
   const checkLoggedIn = async () => {
      try {
         const res = await getCurrentUser();
         setUser(res.user); 
         setIsLoggedIn(true);  
      } catch (error) {
         console.error("Error checking user authentication: ", error);
         setUser(null);
         setIsLoggedIn(false); 
      }
   };

   // useEffect(() => {
   //    handleHomeContents();
   //    checkLoggedIn();
   // }, []);

   const contextValue = useMemo(() => ({
      bigDealOffer,
      devalopers,
      userpost,
      user, 
      isLoggedIn, 
   }), [bigDealOffer, devalopers, userpost, user, isLoggedIn]);

   return (
      <PublicContext.Provider value={contextValue}>
         {children}
      </PublicContext.Provider>
   );
};

export { PublicContext, PublicProvider };
