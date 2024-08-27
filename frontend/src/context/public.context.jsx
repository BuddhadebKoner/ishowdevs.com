import React, { createContext, useEffect, useState, useMemo } from 'react';
import { homeContents } from '../api/admin.api';
import { getCurrentUser } from '../api/user.api';
import { Toaster } from 'react-hot-toast';
import notify from '../utils/notify';

const PublicContext = createContext();

const PublicProvider = ({ children }) => {
   const [bigDealOffer, setBigDealOffer] = useState([]);
   const [devalopers, setDevalopers] = useState([]);
   const [userpost, setUserpost] = useState([]);
   const [user, setUser] = useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   // Fetch home contents data
   const handleHomeContents = async () => {
      try {
         const res = await homeContents();
         setBigDealOffer(res.bigDealOffer);
         setDevalopers(res.devalopers);
         setUserpost(res.userpost);
      } catch (error) {
         notify("Offline", 'error');
         // console.error("Error accessing home contents: ", error);
      }
   };

   // Check if user is logged in and get user details
   const checkLoggedIn = async () => {
      try {
         const res = await getCurrentUser();
         if (res && res.status) {
            if (res.status === 404) {
               notify("No userpost found that showOnHomePage is true", 'error');
               setIsLoggedIn(false);
            } else if (res.status === 405) {
               notify("No user found that showOnHomePage is true", 'error');
               setIsLoggedIn(false);
            } else if (res.status === 406) {
               notify("no post found that isUnderBigdeal is true", 'error');
               setIsLoggedIn(false);
            } else if (res.status === 500) {
               notify("Failed to fetch course offers", 'error');
               setIsLoggedIn(false);
            } else if (res.status === 200) {
               notify("Wellcome Back !", 'success');
               setUser(res.user);
               setIsLoggedIn(true);
            } else {
               notify("User not exist", 'error');
               setIsLoggedIn(false);
            }
         } else {
            console.log("user not logged in");
            // notify("Unexpected response from server", 'error'); 
            setIsLoggedIn(false);
         }
      } catch (error) {
         notify("Failed to check user authentication", 'error');
         setUser(null);
         setIsLoggedIn(false);
      }
   };

   useEffect(() => {
      handleHomeContents();
      checkLoggedIn();
   }, []);

   const contextValue = useMemo(() => ({
      bigDealOffer,
      devalopers,
      userpost,
      user,
      isLoggedIn,
      setIsLoggedIn,
   }), [bigDealOffer, devalopers, userpost, user, isLoggedIn, setIsLoggedIn]);

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
