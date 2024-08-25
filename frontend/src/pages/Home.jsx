import React, { useMemo } from 'react';
// all the components are imported from the components folder
import Welcomelevel from '../components/Welcomelevel';
import Heighlightoffer from '../components/Heighlightoffer';
import Devalopers from '../components/Devalopers';
import Products from '../components/Products';
// flobal style for all home children
import '../styles/Home.css';

export default function pages() {

   const userdetails = {
      // "_id": {
      //    "$oid": "66c640294ce2289ee4e7b895"
      // },
      // "username": "ishowspeed",
      // "fullName": "Buddhadeb Koner",
      // "email": "ishowspeed@gmail.com",
      // "password": "$2b$10$kKIWFSiq3mnxU2Xj/r9zK.wR8nn64sjZ2F6IsOX4Kl6sYb7yW2QLy",
      // "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724268582/cieg5qs9ryg7arxbioym.webp",
      // "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724268584/ecfvepmfm6gzl8loc9nu.jpg",
      // "isVarified": true,
      // "portfolio": "https://buddhadebkoner.vercel.app/",
      // "mobile": "+91 8900280349",
      // "workAs": "Web Developer",
      // "role": "team",
      // "bio": "A dedicated programmer with a strong foundation in software development. Excels at translating client needs into elegant, functional code. Always eager to take on new challenges and learn new technologies.",
      // "mediaLinks": [
      //    "https://www.linkedin.com/in/buddhadeb-koner-8501b3231/",
      //    "https://twitter.com/buddhadeb_koner"
      // ],
      // "keyWords": "App dev,web dev",
      // "isActive": true,
      // "profileRich": 0,
      // "happyCustomer": 0,
      // "createdAt": {
      //    "$date": "2024-08-21T19:29:45.177Z"
      // },
      // "updatedAt": {
      //    "$date": "2024-08-23T11:07:54.074Z"
      // },
      // "__v": 1,
      // "Userpost": []
   }

   const heiglightOffers = {
      title: "Portfolio Website",
      content: "React js with stylist gsap animations",
      image: "https://res.cloudinary.com/dsfztnp9x/image/upload/v1724358441/z0nth4gmz90bzipzhgnm.jpg",
      keyWords: "Portfolio",
      priseBefore: 2999,
      priseNow: 1999,
      offerEndDate: "2024-08-24T10:00:00.000Z"
   }


   const userData = useMemo(() => ({
      ...userdetails
   }), [userdetails]);

   return (

      <>
         <div className="home_page_container">
            <Welcomelevel
               fullName={userData.fullName}
            />
            <div className="heiglight_offers">
               <Heighlightoffer
                  heiglightOffers={heiglightOffers}
               />
            </div>
            <div className="All_devalopers">
               <Devalopers />
            </div>
            <div className="all_services">
               <Products />
            </div>
         </div>
      </>

   )

}