import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function pages() {

   return (

      <>
         <div className="footer_container">
            <div className="icons_box">
               <a href="https://github.com/BuddhadebKoner" target='_blank'>
                  <img src={assets.githubmarkwhite} alt="" />
               </a>
               <a href="https://x.com/buddhadeb_koner" target='_blank'>
                  <img src={assets.x} alt="" />
               </a>
            </div>
            <div className="footer_links_box">
               <Link to="/Explore" className='footer_links'>Explore</Link>
               <Link to="/about" className='footer_links'>About</Link>
               <Link to="/contact" className='footer_links'>Help</Link>
            </div>
            <div className="copyright_box_text">
               <p>2024 © All rights reserved.</p>
            </div>
         </div>
      </>

   )

}