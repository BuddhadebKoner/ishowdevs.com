import React, { useContext, useMemo, useState } from 'react';
import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PublicContext } from '../context/public.context';

export default function components() {
   const { isLoggedIn } = useContext(PublicContext);


   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   const handleOptionClick = () => {
      // Close dropdown when an option is clicked
      setIsDropdownOpen(false);
   };


   const userdetails = {
      avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
   }

   const userData = useMemo(() => ({
      ...userdetails
   }), [userdetails]);

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
                     <option value="Project Manager">Project Manager</option>
                     <option value="QA Engineer">QA Engineer</option>
                  </select>
                  <button>
                     <img src={assets.searchIocn} alt="" />
                  </button>
               </div>
            </div>
            <div className="right_navbar_container">
               <NavLink to={"/explore"} className="navbar_link">
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
                  <NavLink to="" onClick={handleOptionClick}>
                     Sign Out
                  </NavLink>
               </div>
            )}
         </nav>

      </>

   )

}