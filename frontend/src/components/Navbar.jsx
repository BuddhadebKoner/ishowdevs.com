import React, { useContext, useMemo, useState } from 'react';
import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PublicContext } from '../context/public.context';
import { UserContext } from '../context/user.context';

export default function components() {
   const { isLoggedIn, userData, handelExplorePosts } = useContext(PublicContext);
   const { handelLogout } = useContext(UserContext);


   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   const handleOptionClick = () => {
      // Close dropdown when an option is clicked
      setIsDropdownOpen(false);
   };
   const handelSignOut = () => {
      handelLogout();
      setIsDropdownOpen(false);
   };

   window.onload = function () {
      handelExplorePosts();
   };

   return (

      <>
         <nav className="navbar_container">
            <div className="left_navbar_container">
               <NavLink to={""} className="navbar_logo">
                  <span className="logo_normal_text">CODE</span>
                  <span className="text_gradient">BRIDGE</span>
               </NavLink>
            </div>
            <div className="right_navbar_container">
               <NavLink to={"/explore"} className="navbar_link navbar_link_explore" onClick={handelExplorePosts}>
                  Explore
               </NavLink>
               <NavLink to={"/about"} className="navbar_link navbar_link_about">
                  About
               </NavLink>
               <a href="https://github.com/BuddhadebKoner" className='navbar_link_github' target='_blank'>
                  <img src={assets.githubmarkwhite} alt="" />
               </a>
               <a href="https://x.com/buddhadeb_koner" className='navbar_link_tweeter' target='_blank'>
                  <img src={assets.x} alt="" />
                  <p>@buddhadeb_koner</p>
               </a>
               {/* {
                  isLoggedIn ? (
                     <button className="navbar_link navbar_link_profile">
                        {
                           userData.avatar ? (
                              <div>
                                 <img
                                    src={userData.avatar}
                                    className='navbar_profile'
                                    alt=""
                                    onClick={handleDropdownToggle}
                                 />
                              </div>
                           ) : (
                              <NavLink to={"/myacount"}>
                                 <img src={assets.profile} alt="" className='navbar_profile' />
                              </NavLink>
                           )
                        }
                     </button>
                  ) : (
                     <NavLink to={"/login"} className="navbar_link login_navbar_link">
                        Sign in
                     </NavLink>
                  )
               } */}
            </div>

            {isDropdownOpen && (
               <div className="dropdown_menu">
                  <NavLink to="/myacount" onClick={handleOptionClick}>
                     Your Account
                  </NavLink>
                  <NavLink to={"/explore"} onClick={handleOptionClick}>
                     Explore
                  </NavLink>
                  <NavLink to="" onClick={handleOptionClick}>
                     Payment Details
                  </NavLink>
                  <NavLink to="" onClick={handelSignOut}>
                     <img src={assets.logout} alt="" className='dropdown_menu_logout' />
                     Sign Out
                  </NavLink>
               </div>
            )}
         </nav>
      </>

   )

}