import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/user.context';

export default function Layout() {
   const { isLoggedIn } = useContext(UserContext);

   return (
      <>
         <Navbar />
         <Outlet />
      </>
   );
}
