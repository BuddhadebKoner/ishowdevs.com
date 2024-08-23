import React, { useContext, useEffect } from 'react';
import '../styles/Usertestimonial.css';
import Herotext from '../components/Herotext';
import UsersSlider from '../components/UsersSlider';
import { assets } from '../assets/assets';
import { PublicContext } from '../context/public.context';

export default function Components() {
   const { usercount } = useContext(PublicContext)

   return (
      <div className="testimonials_conntainer">
         <div className="testimonials_details_box">
            <div className="testimonials_explore_container">
               <p>
                  Share Your Idea & Build Together <br /> We're independent and run by creators,
               </p>
               <button className='hero_btn_testimonials'>
                  Sign up free
               </button>
            </div>
            <div className="testimonials_explore_couts">
               <p>"A wonderful creator-<br />friendly platform"</p>
               <p>"Everything I need to make income <br /> doing what I love"</p>
               <p>“Get paid for your <br />passion and more!"</p>
            </div>
         </div>
         <div className="testimonials_hero_image">
            <img src={assets.testiminialsHero} alt="Testimonials Hero" />
         </div>

         <div className="we_devalopers_container">
            <Herotext
               text={`${usercount} Devalopers with us`}
            />
            <div className="all_services_container">
               <button className='service_btns' >web development</button>
               <button className='service_btns' >mobile development</button>
               <button className='service_btns' >designer</button>
               <button className='service_btns' >product manager</button>
               <button className='service_btns' >marketing</button>
            </div>
         </div>
         <UsersSlider />
      </div>
   );
}