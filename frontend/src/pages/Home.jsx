import React, { useContext, useMemo } from 'react';
// all the components are imported from the components folder
import Welcomelevel from '../components/Welcomelevel';
import Heighlightoffer from '../components/Heighlightoffer';
import Devalopers from '../components/Devalopers';
import Products from '../components/Products';
// flobal style for all home children
import '../styles/Home.css';

export default function pages() {

   return (

      <>
         <div className="home_page_container">
            <Welcomelevel
            // fullName={userData.fullName}
            />
            <div className="heiglight_offers">
               <Heighlightoffer />
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