import React, { useState } from 'react';
import { assets } from '../assets/assets';
import Notificationlevel from './Notificationlevel';
import '../styles/Navbar.css';

export default function components() {
   const [isLogedIn, setIsLogedIn] = useState(false);

   return (

      <>
         <nav className="navbar_container">
            <div className="navbar_logo">
               <h1>Logo</h1>
            </div>
            <div className="navbar_links">
               <a href="#" className='navbar_links_btns'>Explore</a>
               <a href="#" className='navbar_links_btns'>About</a>
               <a href="#" className='navbar_links_btns'>Blog</a>
               {isLogedIn === true ?
                  <div className="my_profile">
                     <button>
                        <img src={assets.profile} alt="" className='my_profile_iamge' />
                     </button>
                     <button className='hero_btn'>Post</button>
                  </div>
                  :
                  <div className="login_signup">
                     <a href="#" className='navbar_links_btns'>Login</a>
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