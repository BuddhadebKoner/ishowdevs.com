import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// components
import Devaloperdetails from './Cards/Devaloperdetails';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { assets } from '../assets/assets';

export default function UserSwiperSlider() {
   const allUserData = [
      // {
      //    "_id": {
      //       "$oid": "66c640294ce2289ee4e7b895"
      //    },
      //    "username": "ishowspeed",
      //    "fullName": "iShow Speed",
      //    "email": "ishowspeed@gmail.com",
      //    "password": "$2b$10$kKIWFSiq3mnxU2Xj/r9zK.wR8nn64sjZ2F6IsOX4Kl6sYb7yW2QLy",
      //    "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724268582/cieg5qs9ryg7arxbioym.webp",
      //    "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724268584/ecfvepmfm6gzl8loc9nu.jpg",
      //    "isVarified": true,
      //    "portfolio": "https://buddhadebkoner.vercel.app/",
      //    "mobile": "+91 8900280349",
      //    "workAs": "Web Developer",
      //    "role": "team",
      //    "bio": "A dedicated programmer with a strong foundation in software development. Excels at translating client needs into elegant, functional code. Always eager to take on new challenges and learn new technologies.",
      //    "mediaLinks": [
      //       "https://www.linkedin.com/in/buddhadeb-koner-8501b3231/",
      //       "https://twitter.com/buddhadeb_koner"
      //    ],
      //    "keyWords": "App dev,web dev",
      //    "isActive": true,
      //    "profileRich": 0,
      //    "happyCustomer": 0,
      //    "createdAt": {
      //       "$date": "2024-08-21T19:29:45.177Z"
      //    },
      //    "updatedAt": {
      //       "$date": "2024-08-23T11:07:54.074Z"
      //    },
      //    "__v": 1,
      //    "Userpost": []
      // },
      // {
      //    "_id": {
      //       "$oid": "66c645054ce2289ee4e7b978"
      //    },
      //    "username": "buddhadebkoner",
      //    "fullName": "Buddhadeb Koner",
      //    "email": "buddhadebkoner@gmail.com",
      //    "password": "$2b$10$nmmnoC/EHk0n2kH/1kioQuek61ElhvULH7W0XThlSnP9rMCPGuFn6",
      //    "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724269826/bf17d996yyovailuzrwy.jpg",
      //    "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724269828/s86l5dpnjfbhhyexfosa.jpg",
      //    "isVarified": true,
      //    "portfolio": "https://buddhadebkoner.vercel.app/",
      //    "mobile": "+91 909090909",
      //    "workAs": "Web Developer",
      //    "role": "admin",
      //    "bio": "A passionate coder with a love for building digital products. Enjoys the challenge of bringing ideas to life through efficient, maintainable code that delights users.",
      //    "mediaLinks": [
      //       "https://www.linkedin.com/in/buddhadeb-koner-8501b3231/",
      //       "https://www.instagram.com/buddhadeb.exe"
      //    ],
      //    "keyWords": "Web dev, react app",
      //    "isActive": true,
      //    "profileRich": 0,
      //    "happyCustomer": 0,
      //    "posts": [],
      //    "createdAt": {
      //       "$date": "2024-08-21T19:50:29.109Z"
      //    },
      //    "updatedAt": {
      //       "$date": "2024-08-23T11:25:04.557Z"
      //    },
      //    "__v": 1,
      //    "Userpost": [],
      //    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM2NDUwNTRjZTIyODllZTRlN2I5NzgiLCJpYXQiOjE3MjQ0MTIzMDQsImV4cCI6MTcyNzAwNDMwNH0.EyXWKUR6jQyBt6igGQhXjSDVotveceMmHqdmhjzlg2k"
      // },
      // {
      //    "_id": {
      //       "$oid": "66c6453f4ce2289ee4e7b97b"
      //    },
      //    "username": "elonmusk",
      //    "fullName": "Elon musk",
      //    "email": "elonmusk@gmail.com",
      //    "password": "$2b$10$clJ2Au7fwBVFzK3J7J3YVOhcG1nYw0Vp.aHv3N4NBnzJthAst8Nz2",
      //    "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724269884/mvq3ofcgfbpxh9u1bv82.jpg",
      //    "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724269886/mzyr9mo9agr1syx9hjzu.jpg",
      //    "isVarified": false,
      //    "portfolio": "https://buddhadebkoner.vercel.app/",
      //    "mobile": "+91 909090909",
      //    "workAs": "Designer",
      //    "role": "user",
      //    "bio": "A passionate coder with a love for building digital products. Enjoys the challenge of bringing ideas to life through efficient, maintainable code that delights users.",
      //    "mediaLinks": [
      //       "https://www.linkedin.com/in/buddhadeb-koner-8501b3231/",
      //       "https://www.instagram.com/buddhadeb.exe"
      //    ],
      //    "keyWords": "Web dev, react app",
      //    "isActive": true,
      //    "profileRich": 0,
      //    "happyCustomer": 0,
      //    "posts": [],
      //    "createdAt": {
      //       "$date": "2024-08-21T19:51:27.388Z"
      //    },
      //    "updatedAt": {
      //       "$date": "2024-08-21T19:51:27.388Z"
      //    },
      //    "__v": 0
      // },
      // {
      //    "_id": {
      //       "$oid": "66c645994ce2289ee4e7b97e"
      //    },
      //    "username": "jeetkoner",
      //    "fullName": "Jeet koner",
      //    "email": "jeetkoner@gmail.com",
      //    "password": "$2b$10$WXOPOS8H9MaFYNe4t7ap6uMupNPwotHwrluEUkRz98Z7qdXiUz86q",
      //    "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724269973/qfi3o2zvfmxf1l2sfay5.jpg",
      //    "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724269976/vhgwqnl15vu15rrc9nzp.jpg",
      //    "isVarified": true,
      //    "portfolio": "https://buddhadebkoner.vercel.app/",
      //    "mobile": "+91 909090909",
      //    "workAs": "Project Manager",
      //    "role": "user",
      //    "bio": "A passionate coder with a love for building digital products. Enjoys the challenge of bringing ideas to life through efficient, maintainable code that delights users.",
      //    "mediaLinks": [
      //       "https://www.linkedin.com/in/buddhadeb-koner-8501b3231/",
      //       "https://www.instagram.com/buddhadeb.exe"
      //    ],
      //    "keyWords": "Web dev, react app",
      //    "isActive": true,
      //    "profileRich": 0,
      //    "happyCustomer": 0,
      //    "posts": [],
      //    "createdAt": {
      //       "$date": "2024-08-21T19:52:57.352Z"
      //    },
      //    "updatedAt": {
      //       "$date": "2024-08-21T19:52:57.352Z"
      //    },
      //    "__v": 0
      // },
      // {
      //    "_id": {
      //       "$oid": "66c645e14ce2289ee4e7b981"
      //    },
      //    "username": "chaiorcode",
      //    "fullName": "Chai orcode",
      //    "email": "chaiorcode@gmail.com",
      //    "password": "$2b$10$MuMlB0Czy0aH8WZC9myCOuKU7QRFkNZiSIsUUF71bPE7p2SupiH2G",
      //    "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724270045/sdukombczcwanvn6oblb.jpg",
      //    "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724270049/yzcrcnrkaetmepunsdwc.jpg",
      //    "isVarified": false,
      //    "portfolio": "https://buddhadebkoner.vercel.app/",
      //    "mobile": "+91 909090909",
      //    "workAs": "Project Manager",
      //    "role": "user",
      //    "bio": "A passionate coder with a love for building digital products. Enjoys the challenge of bringing ideas to life through efficient, maintainable code that delights users.",
      //    "mediaLinks": [
      //       "https://www.linkedin.com/in/buddhadeb-koner-8501b3231/",
      //       "https://www.instagram.com/buddhadeb.exe"
      //    ],
      //    "keyWords": "Web dev, react app",
      //    "isActive": true,
      //    "profileRich": 0,
      //    "happyCustomer": 0,
      //    "posts": [],
      //    "createdAt": {
      //       "$date": "2024-08-21T19:54:09.989Z"
      //    },
      //    "updatedAt": {
      //       "$date": "2024-08-21T19:54:09.989Z"
      //    },
      //    "__v": 0
      // },
      // {
      //    "_id": {
      //       "$oid": "66c81732211ab62ba44eeec2"
      //    },
      //    "username": "ishospeed",
      //    "fullName": "ishow speed",
      //    "email": "ishospeed@gmail.com",
      //    "password": "$2b$10$73nW4yiCrNnFzGJNcHlOJe4oP.kw5ja.9WRazglELyD8ArEsxClK6",
      //    "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724389169/icleb8di2x6aofcajemp.jpg",
      //    "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724389170/k44boz1nc9j9tloabjed.webp",
      //    "isVarified": false,
      //    "portfolio": "example.com",
      //    "mobile": "+91 8900280349",
      //    "workAs": "softwer dev",
      //    "role": "user",
      //    "bio": "not in mood",
      //    "mediaLinks": [
      //       "\"https://github.com/BuddhadebKoner\""
      //    ],
      //    "keyWords": "app dev",
      //    "isActive": true,
      //    "profileRich": 0,
      //    "happyCustomer": 0,
      //    "Userpost": [],
      //    "createdAt": {
      //       "$date": "2024-08-23T04:59:30.993Z"
      //    },
      //    "updatedAt": {
      //       "$date": "2024-08-23T04:59:30.993Z"
      //    },
      //    "__v": 0
      // }
   ]

   return (
      <>
         <div className="heiglight_devaloper_container">
            <h1 className='heiglight_devaloper_container_h1'>
               Developers <span className='devaloper_Count'>{String(allUserData.length).padStart(2, '0')}</span>
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
                  allUserData.length ? (
                     allUserData && allUserData
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
