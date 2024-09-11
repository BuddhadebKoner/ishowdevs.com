import React, { useContext } from 'react';
import Newpostcard from '../../components/Myacount/Newpostcard';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { PublicContext } from '../../context/public.context';

export default function myacount() {
   const { userData } = useContext(PublicContext)

   return (

      <>
         <div className="newpost_card_container">
            <div className="newpost_card_container_headline">
               <Link to={`/account/${userData._id}/posts`}>
                  <img src={assets.arrowBack} alt="" />
               </Link>
               <h1>New post card</h1>
            </div>
            <Newpostcard />
         </div >
      </>

   )

}