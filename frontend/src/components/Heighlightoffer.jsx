import React, { useState, useEffect } from 'react';

export default function HighlightOffers({ heiglightOffers }) {
   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

   useEffect(() => {
      const countdownDate = new Date("2024-09-01T00:00:00").getTime(); // Set your countdown end date here

      const timer = setInterval(() => {
         const now = new Date().getTime();
         const distance = countdownDate - now;

         const days = Math.floor(distance / (1000 * 60 * 60 * 24));
         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

         setTimeLeft({ days, hours, minutes, seconds });

         if (distance < 0) {
            clearInterval(timer);
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
         }
      }, 1000);

      return () => clearInterval(timer);
   }, []);

   return (
      <>
         <div className="heiglight_offers_container_box">
            <h1 className='heiglight_offers_container_box_heading'>Big Deal</h1>
            <div className="heiglight_offers_details_container">
               <p className='buy_now_text'>Buy now</p>
               <div className="heiglight_offers_image_container">
                  <img src={heiglightOffers.image} alt="" />
               </div>
               <div className="heiglight_offers_details">
                  <p className='heiglight_offers_details_title'>{heiglightOffers.title}</p>
                  <p className='heiglight_offers_details_content'>{heiglightOffers.content}</p>
                  <div className='heiglight_offers_details_prise'>
                     <p className='priseBefore'>
                        <span>₹</span>
                        {heiglightOffers.priseBefore}
                        <span>/-</span>
                     </p>
                     <p className='priseNow'>
                        <span>₹</span>
                        {heiglightOffers.priseNow}
                        <span>/-</span>
                     </p>
                  </div>
                  <div className='countdown'>
                     <p>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
