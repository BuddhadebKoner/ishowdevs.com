import React, { useState } from 'react';
import { assets } from '../assets/assets';
import Notificationlevel from './Notificationlevel';
import '../styles/Navbar.css';
import { NavLink } from 'react-router-dom';

export default function components() {
   const [isLogedIn, setIsLogedIn] = useState(false);

   return (

      <>
         <nav className="navbar_container">
            <div className="navbar_logo">
               <NavLink to={"/"} className='navbar_links_btns'>
                  <h1>Logo</h1>
               </NavLink>
            </div>
            <div className="navbar_links">
               <NavLink to={"explore"} className='navbar_links_btns'>Explore</NavLink>
               <NavLink to={"about"} className='navbar_links_btns'>About</NavLink>
               <NavLink to={"blogpost"} className='navbar_links_btns'>Blog</NavLink>
               {isLogedIn === true ?
                  <div className="my_profile">
                     <button>
                        <img src={assets.profile} alt="" className='my_profile_iamge' />
                     </button>
                     <button className='hero_btn'>Post</button>
                  </div>
                  :
                  <div className="login_signup">
                     <NavLink to={"login"} className='navbar_links_btns'>Login</NavLink>
                     <button className='hero_btn'>Sign up</button>
                  </div>
               }
            </div>
         </nav>
         <Notificationlevel
            note={'Notice : To be our team member sign up or contact with website admiin'}
            link={'#'}
         />
      </>

   )

}