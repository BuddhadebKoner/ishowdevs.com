import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { PublicContext } from '../context/public.context';


// components
import Devaloperdetails from './Cards/Devaloperdetails';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { assets } from '../assets/assets';

export default function UserSwiperSlider() {
   const { devalopers } = useContext(PublicContext);

   return (
      <>
         <div className="heiglight_devaloper_container">
            <h1 className='heiglight_devaloper_container_h1'>
               Developers <span className='devaloper_Count'>{String(devalopers.length).padStart(2, '0')}</span>
            </h1>
            <button className='swiper_button_next'>
               <img src={assets.arrow} alt="" />
            </button>

         </div>
         <div className="users_swiper_slider">
            <Swiper
               slidesPerView={3}
               spaceBetween={30}
               loop={true}
               navigation={{
                  nextEl: '.swiper_button_next',
                  prevEl: null,
               }}
               modules={[Navigation, Autoplay]}
               className="mySwiper"
            >
               {
                  devalopers.length ? (
                     devalopers && devalopers
                        .map((user, index) => (
                           <SwiperSlide key={index}>
                              <Devaloperdetails user={user} />
                           </SwiperSlide>
                        ))
                  ) : (
                     <SwiperSlide>
                        <div className="heiglight_devaloper_container_skelliton"></div>
                     </SwiperSlide>
                  )
               }
            </Swiper>
         </div>
      </>
   );
}
