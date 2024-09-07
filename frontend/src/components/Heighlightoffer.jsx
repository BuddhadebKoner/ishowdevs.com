import React, { useState, useEffect, useContext } from 'react';
import { PublicContext } from '../context/public.context';
import { Link } from 'react-router-dom';

export default function HighlightOffers() {
   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

   //context api
   const { bigDealOffer, setPublicPost } = useContext(PublicContext);


   // Ensure we use the first item in the array if bigDealOffer is an array
   const offer = Array.isArray(bigDealOffer) ? bigDealOffer[0] : bigDealOffer;

   useEffect(() => {
      if (offer?.offerEndDate) {

         const countdownDate = new Date(new Date(offer.offerEndDate).getTime() + (5.5 * 60 * 60 * 1000)).getTime();

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
      }

   }, [offer]);

   const handelSetPublicPost = () => {
      console.log(offer);
      setPublicPost(offer);
      localStorage.setItem('publicPost', JSON.stringify(offer));
   }

   return (
      <>
         {offer ? (
            <div className="heiglight_offers_container_box">
               <h1 className='heiglight_offers_container_box_heading'>Big Deal</h1>
               <Link to={"/publicpost"}>
                  <div className="heiglight_offers_details_container" onClick={handelSetPublicPost}>
                     <p className='buy_now_text'>Buy now</p>
                     <div className="heiglight_offers_image_container">
                        <img src={offer.image} alt="" />
                     </div>
                     <div className="heiglight_offers_details">
                        <p className='heiglight_offers_details_title'>{offer.title}</p>
                        <p className='heiglight_offers_details_content'>{offer.content}</p>
                        <div className='heiglight_offers_details_prise'>
                           <p className='priseBefore'>
                              <span>₹</span>
                              {offer.priseBefore}
                              <span>/-</span>
                           </p>
                           <p className='priseNow'>
                              {offer.priseNow === 0 ? (
                                 <span>Free</span>
                              ) : (
                                 <>
                                    <span>₹</span>
                                    {offer.priseNow}
                                    <span>/-</span>
                                 </>
                              )}
                           </p>
                        </div>
                        {
                           offer.offerEndDate ? (
                              <div className='countdown'>
                                 <p>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</p>
                              </div>
                           ) : (
                              <p></p>
                           )
                        }

                     </div>
                  </div>
               </Link>
            </div >
         ) : (
            <div className="heiglight_offers_container_box_skelliton"></div>
         )
         }
      </>
   );
}
