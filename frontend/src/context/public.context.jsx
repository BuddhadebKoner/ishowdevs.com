import React, { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { homeContents } from '../api/admin.api';
import { getCurrentUser } from '../api/user.api';
import { Toaster } from 'react-hot-toast';
import notify from '../utils/notify';
import { getallposts } from '../api/posts.api';

const PublicContext = createContext();

const PublicProvider = ({ children }) => {
   const [bigDealOffer, setBigDealOffer] = useState([]);
   const [Developers, setDevelopers] = useState([]);
   const [userpost, setUserpost] = useState([]);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   // userData state
   const [userData, setUserData] = useState(null);
   // loading component state
   const [loading, setLoading] = useState(false);
   // explore section posts data 
   const [explorePosts, setExplorePosts] = useState([]);
   // public post page data
   const [publicPost, setPublicPost] = useState();
   // public account user posts
   const [publicUserPosts, setPublicUserPosts] = useState([]);

   // Fetch home contents data
   const handleHomeContents = async () => {
      setLoading(true);
      try {
         const res = await homeContents();
         setBigDealOffer(res.bigDealOffer);
         setDevelopers(res.Developers);
         setUserpost(res.userpost);
         setLoading(false);
      } catch (error) {
         notify("Server Issue ! so take a coffe and Try again", 'error');
         setLoading(false);
      }
   };

   // check if user is logged in
   const checkLoggedIn = async () => {
      setLoading(true);
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
            setLoading(false);
         }
      } catch (error) {
         notify("Failed to check user authentication", 'error');
         setIsLoggedIn(false);
         setLoading(false);
      }
   };

   // handle error response
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

   // get all posts for explore page
   const handelExplorePosts = async () => {
      setLoading(true);
      try {
         const res = await getallposts();
         if (res && res.status === 200) {
            setExplorePosts(res.data.data);
            setLoading(false);
         } else if (res && res.status === 404) {
            notify("No post found to display on the explore page.", 'error');
            setLoading(false);
         } else if (res && res.status === 500) {
            notify("Internal server error. Please try again later.", 'error');
            setLoading(false);
         } else {
            handleErrorResponse(res);
            setLoading(false);
         }
      } catch (error) {
         console.log("Server Issue ! so take a coffe and Try again", 'error');
         setLoading(false);
      }
   };
   // get public acount user post 
   const handelPublicUserPostByid = async (userid) => {
      setLoading(true);
      // console.log("User id:", userid);
      try {
         const res = await getAllPostsByUserId(userid);
         if (res.status === 200) {
            // console.log("Fetched posts:", res.data.data);
            setPublicUserPosts(res.data.data);
            setLoading(false);
         } else {
            notify("Failed to get user posts", 'error');
            // console.error("Error getting all posts by user:", res);
            setLoading(false);
         }
      } catch (error) {
         // notify("Failed to get user posts", 'error');
         console.log("Error getting all posts by user:");
         setLoading(false);
      }
   };

   useEffect(() => {
      handleHomeContents();
      checkLoggedIn();
   }, []);

   const contextValue = useMemo(() => ({
      bigDealOffer,
      Developers,
      userpost,
      isLoggedIn,
      setIsLoggedIn,
      userData,
      setUserData,
      setLoading,
      loading,
      explorePosts,
      handelExplorePosts,
      setPublicPost,
      publicPost,
      publicUserPosts,
      handelPublicUserPostByid,
   }), [bigDealOffer, Developers, userpost, isLoggedIn, setIsLoggedIn, userData, setUserData, setLoading, loading, explorePosts, handelExplorePosts, publicPost, setPublicPost, publicUserPosts, handelPublicUserPostByid,]);

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