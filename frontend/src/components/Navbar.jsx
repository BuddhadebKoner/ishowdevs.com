import React, { useContext, useMemo } from 'react';
import '../styles/Navbar.css';
import { UserContext } from '../context/user.context';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

export default function components({ isLoggedIn }) {
   const { userdetails } = useContext(UserContext);

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
               <NavLink to={"/login"} className="navbar_link">
                  Avatar
               </NavLink>
            </div>
         </nav>

      </>

   )

}