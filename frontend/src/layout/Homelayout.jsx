import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import TopLoader from '../components/TopLoader/Loader';

export default function Layout() {
   const { isLoggedIn } = useContext(UserContext);

   return (
      <>
         <TopLoader />
         <Navbar
            isLoggedIn={isLoggedIn}
         />
         <Outlet />
      </>
   );
}
