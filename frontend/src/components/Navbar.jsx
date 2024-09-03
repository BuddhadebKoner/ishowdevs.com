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
               <div className="input_field_container">
                  <select
                     name="WorkAs"
                     id="WorkAs"
                     autoComplete="off"
                     className="dark_mode_dropdown"
                     required
                     defaultValue="Web Developer"
                  >
                     <option value="Web Developer" disabled hidden>
                        Web Developer
                     </option>
                     <option value="Web Developer">Web Developer</option>
                     <option value="Designer">Designer</option>
                     <option value="App Devaloper">App Devaloper</option>
                     <option value="Artificial Intelligence">Artificial Intelligence</option>
                     <option value="metarial">metarial</option>
                  </select>
                  <button>
                     <img src={assets.searchIocn} alt="" />
                  </button>
               </div>
            </div>
            <div className="right_navbar_container">
               <NavLink to={"/explore"} className="navbar_link" onClick={handelExplorePosts}>
                  Explore
               </NavLink>
               <NavLink to={"/about"} className="navbar_link">
                  About
               </NavLink>
               <NavLink to={"/blogpost"} className="navbar_link">
                  Blog
               </NavLink>
               {
                  isLoggedIn ? (
                     <button className="navbar_link">
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
                     <NavLink to={"/login"} className="navbar_link">
                        Log in
                     </NavLink>
                  )
               }

            </div>

            {isDropdownOpen && (
               <div className="dropdown_menu">
                  <NavLink to="/myacount" onClick={handleOptionClick}>
                     Your Account
                  </NavLink>
                  <NavLink to="" onClick={handleOptionClick}>
                     Payment Details
                  </NavLink>
                  <NavLink to="" onClick={handelSignOut}>
                     Sign Out
                  </NavLink>
               </div>
            )}
         </nav>
      </>

   )

}