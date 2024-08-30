import React, { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { homeContents } from '../api/admin.api';
import { getCurrentUser } from '../api/user.api';
import { Toaster } from 'react-hot-toast';
import notify from '../utils/notify';

const PublicContext = createContext();

const PublicProvider = ({ children }) => {
   const [bigDealOffer, setBigDealOffer] = useState([]);
   const [devalopers, setDevalopers] = useState([]);
   const [userpost, setUserpost] = useState([]);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   // userData state
   const [userData, setUserData] = useState(null);

   // Fetch home contents data
   const handleHomeContents = async () => {
      try {
         const res = await homeContents();
         setBigDealOffer(res.bigDealOffer);
         setDevalopers(res.devalopers);
         setUserpost(res.userpost);
      } catch (error) {
         notify("Server Issue ! so take a coffe and Try again", 'error');
      }
   };

   const checkLoggedIn = async () => {
      try {
         const res = await getCurrentUser();

         if (res && res.status === 200) {
            setUserData(res.data.data);
            setIsLoggedIn(true);
         } else if (res && res.status === 401) {
            notify("Session expired. Please log in again.", 'error');
            setIsLoggedIn(false);
         } else {
            handleErrorResponse(res);
         }
      } catch (error) {
         notify("Failed to check user authentication", 'error');
         setIsLoggedIn(false);
      }
   };

   const handleErrorResponse = (res) => {
      const errorMessages = {
         404: "No user post found to display on the home page.",
         405: "No user found with the criteria to display on the home page.",
         406: "No post found under the 'Big Deal' offer.",
         500: "Internal server error. Please try again later.",
      };

      const message = errorMessages[res.status] || "Unexpected server response";
      setIsLoggedIn(false);
   };



   useEffect(() => {
      handleHomeContents();
      checkLoggedIn();
   }, []);

   const contextValue = useMemo(() => ({
      bigDealOffer,
      devalopers,
      userpost,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData
   }), [bigDealOffer, devalopers, userpost, isLoggedIn, setIsLoggedIn, userData, setUserData]);

   return (
      <PublicContext.Provider value={contextValue}>
         {children}
         <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
               className: '',
               style: {
                  marginBottom: '10px',
               },
            }}
         />
      </PublicContext.Provider>
   );
};

export { PublicContext, PublicProvider };