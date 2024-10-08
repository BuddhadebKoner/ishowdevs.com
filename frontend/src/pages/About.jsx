import React from 'react';
import '../styles/About.css';
import { assets } from '../assets/assets';

export default function pages() {

   return (

      <>
         <div className="about_container">
            <div className="batch_container">
               <p>🚀   lets contribute something</p>
               <img src={assets.samll_right_arrow} alt="" />
            </div>
            <div className="about_container_heading">
               <h1>We Are <span className='about_container_heading_highlight'>Connecting<br /> Developers</span> & Customers</h1>
            </div>
            <div className="about_container_desc">
               <p>Empowering Collaboration for Seamless Digital Solutions Across the Globe.</p>
            </div>
            <div className="about_hero_btns_container">
               <a href="https://buddhadebkoner.rajislab.com/" className='about_hero_btns_01' target='_blank'>
                  <img src={assets.rocketLogo} alt="" className='about_hero_btns' />
                  <p>Get Started</p>
               </a>
               <a href="https://github.com/BuddhadebKoner/NFB-website" className='about_hero_btns_02' target='_blank'>
                  <img src={assets.githubmarkwhite} alt="" className='about_hero_btns' />
                  <p>Star on GitHub</p>
               </a>
            </div>
         </div>
      </>

   )

}