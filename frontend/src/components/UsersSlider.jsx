   import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ContributersCards from './ContributersCards';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../styles/UsersSlider.css';


// import required modules
import { Pagination } from 'swiper/modules';

export default function components() {
   return (
      <>
         <div className="users_swiper_slider">

            <Swiper
               slidesPerView={2}
               spaceBetween={30}
               modules={[Pagination]}
               className="mySwiper"
            >
               <SwiperSlide>
                  <ContributersCards />
               </SwiperSlide>
               <SwiperSlide>
                  <ContributersCards />
               </SwiperSlide>
               <SwiperSlide>
                  <ContributersCards />
               </SwiperSlide>
            </Swiper>
         </div>
      </>
   );
}
