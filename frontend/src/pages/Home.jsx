import React from 'react';
import Userhome from '../components/Userhome';
import Usertestimonial from '../components/Usertestimonial';

export default function pages() {

   return (

      <>
         <div className="home_page_container">
            <Userhome />
            <Usertestimonial />
         </div>
      </>

   )

}