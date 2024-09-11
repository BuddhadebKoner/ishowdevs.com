import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { UserContext } from '../../context/user.context';

export default function Myacount() {
   const { userData, handelDeleteAccount } = useContext(UserContext);

   const deleteAccount = () => {
      console.log("delete");
      handelDeleteAccount();
   };

   return (
      <div className="myacount_sidebar_container">
         <NavLink 
            to="" 
            className="myacount_sidebar_link shining_effect"
         >
            <img src={assets.myprofile} alt="My Profile" />
            My Profile
         </NavLink>
         <NavLink
            to="posts"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.myposts} alt="Your Posts" />
            Your Posts
         </NavLink>
         <NavLink
            to="payment-details"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.paymentRupee} alt="Payment Details" />
            Payment Details
         </NavLink>
         <NavLink
            to="change-password"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.changepass} alt="Change Password" />
            Change Password
         </NavLink>
         <button className='myacount_sidebar_link' onClick={deleteAccount}>
            <img src={assets.deleteforever} alt="Delete Account" />
            Delete Account
         </button>
      </div>
   );
}
