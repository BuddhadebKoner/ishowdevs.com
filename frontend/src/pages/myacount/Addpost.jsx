import React from 'react';
import Newpostcard from '../../components/Myacount/Newpostcard';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

export default function myacount() {

   return (

      <>
         <div className="newpost_card_container">
            <div className="newpost_card_container_headline">
               <Link to={"/myacount/myposts"}>
                  <img src={assets.arrowBack} alt="" />
               </Link>
               <h1>New post card</h1>
            </div>
            <Newpostcard />
         </div>
      </>

   )

}