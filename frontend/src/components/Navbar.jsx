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
            <div className="input_field_container">
               <select
                  name="WorkAs"
                  id="WorkAs"
                  autoComplete="off"
                  className="dark_mode_dropdown"
                  required
                  defaultValue="Select your catagory"
               >
                  <option value="">Select your catagory</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="App Developer">App Developer</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="metarial">Material</option>
               </select>
               <button>
                  <img src={assets.searchIocn} alt="" />
               </button>
            </div>
            <a href="https://github.com/BuddhadebKoner" className='navbar_link_github' target='_blank'>
               <img src={assets.githubmarkwhite} alt="" />
            </a>
            <div className="right_navbar_container">
               <NavLink to={"/explore"} className="navbar_link navbar_link_explore" onClick={handelExplorePosts}>
                  Explore
               </NavLink>
               <NavLink to={"/about"} className="navbar_link navbar_link_about">
                  About
               </NavLink>
               <a href="https://x.com/buddhadeb_koner" className='navbar_link_tweeter' target='_blank'>
                  <img src={assets.x} alt="" />
                  <p>@buddhadeb_koner</p>
               </a>
               {
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
                              <div>
                                 <img src={assets.profile} alt="" className='navbar_profile' />
                              </div>
                           )
                        }
                     </button>
                  ) : (
                     <NavLink to={"/login"} className="navbar_link login_navbar_link">
                        Sign in
                     </NavLink>
                  )
               }
            </div>

            {isDropdownOpen && (
               <div className="dropdown_menu">
                  <NavLink to={`account/${userData._id}`} onClick={handleOptionClick}>
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