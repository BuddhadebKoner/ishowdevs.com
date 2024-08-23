import React, { createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   



   return (
      <UserContext.Provider value={{
      }}>
         {children}
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };