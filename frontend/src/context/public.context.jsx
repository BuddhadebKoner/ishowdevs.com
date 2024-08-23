import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getAllUsers } from '../api/user.api';

const PublicContext = createContext();

const PublicProvider = ({ children }) => {
   const [allUsersdata, setAllUsersdata] = useState(null);
   const [usercount, setUsercount] = useState(0);
   // which public profile you are watching
   const [watchingProfile, setWatchingProfile] = useState(() => {
      // Retrieve the value from localStorage on initial render, if available
      const storedProfile = localStorage.getItem('watchingProfile');
      return storedProfile ? JSON.parse(storedProfile) : null;
   });


   const handelAllUsersData = async () => {
      try {
         const res = await getAllUsers();

         if (res?.success) {
            // console.log("All users data:", res.message);
            setAllUsersdata(prevDetails =>
               prevDetails === res.message ? prevDetails : res.message
            );
            setUsercount(res.message.length)
         } else {
            console.error("Failed to get users data:", res?.message || "Unknown error");
         }

      } catch (error) {
         console.error("Error fetching users data:", error.message || error);
      }
   }

   useEffect(() => {
      handelAllUsersData();
   }, []);

   const handlePublicProfileAccess = useCallback((user) => {
      if (user) {
         // If user is provided, update both localStorage and state
         localStorage.setItem('watchingProfile', JSON.stringify(user));
         setWatchingProfile(user);
      }
   }, []);




   return (
      <PublicContext.Provider value={{
         allUsersdata,
         usercount,
         setWatchingProfile,
         watchingProfile,
         handlePublicProfileAccess
      }}>
         {children}
      </PublicContext.Provider>
   );
};

export { PublicContext, PublicProvider };