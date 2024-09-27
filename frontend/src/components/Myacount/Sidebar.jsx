import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { UserContext } from '../../context/user.context';

export default function Myacount() {
   const { userData, handelDeleteAccount } = useContext(UserContext);

   const deleteAccount = () => {
      alert("Are you sure you want to delete your account?");
      // yes no option
      if (window.confirm("Are you sure you want to delete your account?")) {
         console.log("delete");
         handelDeleteAccount();
      }
   };

   return (
      <div className="myacount_sidebar_container">
         <NavLink
            to=""
            className="myacount_sidebar_link shining_effect"
         >
            <img src={assets.myprofile} alt="My Profile" />
            <p>
               My Profile
            </p>
         </NavLink>
         <NavLink
            to="posts"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.myposts} alt="Your Posts" />
            <p>
               Your Posts
            </p>
         </NavLink>
         <NavLink
            to="payment-details"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.paymentRupee} alt="Payment Details" />
            <p>
               Payment Details
            </p>
         </NavLink>
         <NavLink
            to="change-password"
            className={({ isActive }) =>
               isActive ? "NavlinkActive myacount_sidebar_link" : "myacount_sidebar_link"
            }
         >
            <img src={assets.changepass} alt="Change Password" />
            <p>
               Change Password
            </p>
         </NavLink>
         <button className='myacount_sidebar_link' onClick={deleteAccount}>
            <img src={assets.deleteforever} alt="Delete Account" />
            <p>
               Delete Account
            </p>
         </button>
      </div>
   );
}
