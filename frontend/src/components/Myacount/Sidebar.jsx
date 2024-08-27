import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Myacount() {
   const location = useLocation(); // Use useLocation hook here

   return (
      <div className="myacount_sidebar_container">
         <NavLink to="" className="myacount_sidebar_link shining_effect">
            My Profile
         </NavLink>
         <NavLink
            to="/myacount/myposts"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            Your Posts
         </NavLink>
         <NavLink
            to="/myacount/paymentdetails"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            Payment Details
         </NavLink>
         <NavLink
            to="/myacount/chnagepassword"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            Change Password
         </NavLink>
         <button className='myacount_sidebar_link'>
            Sign out
         </button>
      </div >
   );
}
