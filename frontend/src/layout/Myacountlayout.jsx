import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function layout() {

   return (
      <>
         <nav>
            <Link to="/myacount/myprofile">Profile</Link>
            <Link to="/myacount/myposts">Posts</Link>
            <Link to="/myacount/paymentdetails">Payment</Link>
            <Link to="/myacount/chnagepassword">Change Password</Link>
         </nav>
         <Outlet />
      </>

   )

}