import React, { createContext } from 'react';
import { userRegister } from '../api/user.api';
import { Toaster } from 'react-hot-toast';
import notify from '../utils/notify';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [fullName, setFullName] = React.useState('');
   const [username, setUsername] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');

   const validateFields = () => {
      if (!fullName || !username || !email || !password) {
         notify("Please fill all required fields");
         return false;
      }
      if (fullName.length > 30 || username.length > 30 || email.length > 30 || password.length > 30) {
         notify("Fields must be less than 30 characters");
         return false;
      }
      if (/\s/.test(username)) {
         notify("Username cannot contain spaces");
         return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         notify("Please enter a valid email address");
         return false;
      }
      return true;
   };

   const handelUserRegister = async () => {
      if (!validateFields()) {
         return;
      }

      const user = {
         fullName,
         username,
         email,
         password,
      };

      try {
         const res = await userRegister(user);
         if (res.status === 201) {
            notify("User registered successfully", 'success');
         } else if (res.status === 400) {
            notify("Please fill all required fields", 'error');
         } else if (res.status === 409) {
            notify("User already exists", 'error');
         } else {
            notify("Registration error", 'error');
         }
      } catch (error) {
         notify("Failed to send data to server", 'error');
      }
   };

   return (
      <UserContext.Provider value={{
         setFullName,
         setUsername,
         setEmail,
         setPassword,
         handelUserRegister,
      }}>
         {children}
         <Toaster
            position="top-right"
            reverseOrder={false}
         />
      </UserContext.Provider>
   );
};

export { UserProvider, UserContext };
