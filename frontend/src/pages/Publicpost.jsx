import React, { useContext, useEffect, useState } from 'react';
import { PublicContext } from '../context/public.context';

export default function Pages() {
   const { publicPost, setPublicPost } = useContext(PublicContext);
   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });


   useEffect(() => {
      const savedPost = localStorage.getItem('publicPost');
      if (savedPost) {
         setPublicPost(JSON.parse(savedPost));
      }
   }, [setPublicPost]);

   useEffect(() => {
      if (publicPost?.offerEndDate) {
         const countdownDate = new Date(new Date(publicPost.offerEndDate).getTime() + (5.5 * 60 * 60 * 1000)).getTime();

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
   }, [publicPost]);

   return (
      <>
         {publicPost ? (
            <div className='publicpost_container'>
               <div className="publicpost_feature_product_container">
                  <div className="publicpost_container_heading_container">
                     <h1>Try the product</h1>
                  </div>
                  <div className="publicpost_ifream_container">
                     <iframe src={publicPost.projectLink} frameBorder="0"></iframe>
                  </div>
               </div>
               <div className="publicpost_feature_product_details_container">
                  <div className="title_order_btn">
                     <h1>{publicPost.title}</h1>
                     <button>Order Now</button>
                  </div>
                  <div className="desc_post_container">
                     <p>{publicPost.content}</p>
                  </div>
                  <div className='heiglight_offers_details_prise'>
                     <p className='priseBefore'>
                        <span>₹</span>
                        {publicPost.priseBefore}
                        <span>/-</span>
                     </p>
                     <p className='priseNow'>
                        {publicPost.priseNow === 0 ? (
                           <span>Free</span>
                        ) : (
                           <>
                              <span>₹</span>
                              {publicPost.priseNow}
                              <span>/-</span>
                           </>
                        )}
                     </p>
                  </div>
                  {publicPost.offerEndDate ? (
                     <div className='countdown'>
                        <p>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</p>
                     </div>
                  ) : (
                     <p></p>
                  )}
               </div>
            </div>
         ) : (
            <p>No post selected.</p>
         )}
      </>
   );
}
