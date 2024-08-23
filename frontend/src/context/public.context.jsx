import React, { createContext } from 'react';

const PublicContext = createContext();

const PublicProvider = ({ children }) => {

   return (
      <PublicContext.Provider value={{

      }}>
         {children}
      </PublicContext.Provider>
   );
};

export { PublicContext, PublicProvider };