import React, { createContext, useEffect, useState } from 'react';

const PostContext = createContext();

const PostProvider = ({ children }) => { 




   return (
      <PostContext.Provider value={{
         
      }}>
         {children}
      </PostContext.Provider>
   );
};



export { PostContext, PostProvider };
