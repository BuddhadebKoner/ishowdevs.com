import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';

export default function Myacount() {
   const location = useLocation();

   return (
      <div className="myacount_sidebar_container">
         <NavLink to="" className="myacount_sidebar_link shining_effect">
            <img src={assets.myprofile} alt="" />
            My Profile
         </NavLink>
         <NavLink
            to="/myacount/myposts"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.myposts} alt="" />
            Your Posts
         </NavLink>
         <NavLink
            to="/myacount/paymentdetails"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.paymentRupee} alt="" />
            Payment Details
         </NavLink>
         <NavLink
            to="/myacount/chnagepassword"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.changepass} alt="" />
            Change Password
         </NavLink>
         <button className='myacount_sidebar_link'>
            <img src={assets.logout} alt="" />
            Delete Acount
         </button>
      </div >
   );
}
