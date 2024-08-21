import React, { createContext, useEffect, useState } from 'react';
import { getAllUsers } from '../api/user.api';

const PublicContext = createContext();

const PublicProvider = ({ children }) => {
   const [allUsersdata, setAllUsersdata] = useState(null);
   const [usercount, setUsercount] = useState(0);


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


   return (
      <PublicContext.Provider value={{
         allUsersdata,
         usercount
      }}>
         {children}
      </PublicContext.Provider>
   );
};

export { PublicContext, PublicProvider };
