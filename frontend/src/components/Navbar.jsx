import React from 'react';
import { assets } from '../assets/assets';
import '../styles/Navbar.css';

export default function components() {

   return (

      <>
         <nav className="navbar_container">
            <div className="navbar_logo">
               <h1>Logo</h1>
            </div>
            <div className="navbar_links">
               <a href="#" className='navbar_links_btns'>Home</a>
               <a href="#" className='navbar_links_btns'>About</a>
               <a href="#" className='navbar_links_btns'>Blog</a>
               <div className="my_profile">
                  <button>
                     <img src={assets.profile} alt="" className='my_profile_iamge'/>
                  </button>
                  <button className='hero_btn'>Post</button>
               </div>
               <div className="login_signup">
                  <a href="#" className='navbar_links_btns'>Login</a>
                  <button className='hero_btn'>Signup</button>
               </div>
            </div>
         </nav>
      </>

   )

}