import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js'; // Import anime.js
import '../styles/Usertestimonial.css';
import Herotext from '../components/Herotext';
import { assets } from '../assets/assets';

export default function Components() {



   // useEffect(() => {
   //    function randomValues() {
   //       anime({
   //          targets: '.square, .circle, .triangle',
   //          translateX: function () {
   //             return anime.random(-500, 500);
   //          },
   //          translateY: function () {
   //             return anime.random(-300, 300);
   //          },
   //          rotate: function () {
   //             return anime.random(0, 360);
   //          },
   //          scale: function () {
   //             return anime.random(0.2, 2);
   //          },
   //          duration: 1000,
   //          easing: 'easeInOutQuad',
   //          complete: randomValues,
   //       });
   //    }

   //    randomValues();

   // }, []);




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
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>

            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>

            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
            <div className="triangle"></div>
         </div>

         <div className="we_devalopers_container">
            <Herotext
               text={"11 Devalopers with us "}
            />
            <div className="all_services_container">
               <button className='service_btns' >web development</button>
               <button className='service_btns' >mobile development</button>
               <button className='service_btns' >designer</button>
               <button className='service_btns' >product manager</button>
               <button className='service_btns' >marketing</button>
            </div>
         </div>

      </div>
   );
}
