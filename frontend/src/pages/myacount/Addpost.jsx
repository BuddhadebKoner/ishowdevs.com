import React from 'react';
import Newpostcard from '../../components/Myacount/Newpostcard';
import { assets } from '../../assets/assets';

export default function myacount() {

   return (

      <>
         <div className="newpost_card_container">
            <div className="newpost_card_container_headline">
               <img src={assets.arrow} alt="" />
               <h1>New post card</h1>
            </div>
            <Newpostcard />
         </div>
      </>

   )

}