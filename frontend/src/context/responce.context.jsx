import React, { createContext, useState } from 'react';

const ResponceContext = createContext();

const ResponceProvider = ({ children }) => {


   const value = {

   };

   return (
      <ResponceContext.Provider value={
         value
      }>
         {children}
      </ResponceContext.Provider>
   );
};

export { ResponceContext, ResponceProvider };
