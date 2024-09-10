import React, { useContext, useMemo } from 'react';
// all the components are imported from the components folder
import Welcomelevel from '../components/Welcomelevel';
import Heighlightoffer from '../components/Heighlightoffer';
import Developers from '../components/Devalopers';
import Products from '../components/Products';
// flobal style for all home children
import '../styles/Home.css';
import { PublicContext } from '../context/public.context';

export default function pages() {
   const { userData } = useContext(PublicContext);


   return (

      <>
         <div className="home_page_container">
            <Welcomelevel
               fullName={userData?.fullName}
               isBatchShow={true}
            />
            <div className="heiglight_offers">
               <Heighlightoffer />
            </div>
            <div className="All_Developers">
               <Developers />
            </div>
            <div className="all_services">
               <Products />
            </div>
         </div>
      </>

   )

}