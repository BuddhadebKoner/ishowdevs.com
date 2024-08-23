import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ContributersCards from './ContributersCards';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../styles/UsersSlider.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { PublicContext } from '../context/public.context';

export default function Components() {
   const { allUsersdata } = useContext(PublicContext);
   const [sliderLoading, setSliderLoading] = useState(true);

   useEffect(() => {
      if (allUsersdata) {
         setSliderLoading(false);
      } else {
         setSliderLoading(true);
      }
   }, [allUsersdata]);

   return (
      <>
         <div className="users_swiper_slider">
            <Swiper
               slidesPerView={2}
               spaceBetween={30}
               autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
               }}
               pagination={{
                  clickable: true,
               }}
               modules={[Pagination, Autoplay]}
               className="mySwiper"
            >
               {allUsersdata && allUsersdata
                  .filter(user => user.isActive) 
                  .map(user => (
                     <SwiperSlide key={user._id}>
                        <ContributersCards
                           sliderLoading={sliderLoading}
                           user={user}
                        />
                     </SwiperSlide>
                  ))
               }
            </Swiper>
         </div>
      </>
   );
}
