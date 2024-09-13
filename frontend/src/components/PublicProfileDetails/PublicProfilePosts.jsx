import React from 'react';
import Productdetails from '../../components/Cards/Productdetails'

export default function PublicProfileDetails({ publicAccountShow }) {


   return (

      <>
         <div className="public_profile_posts">
            {
               publicAccountShow ? (
                  publicAccountShow && publicAccountShow
                     .map((post, index) => (
                        <div key={index} className="product_item">
                           <Productdetails post={post} />
                        </div>
                     ))
               ) : (
                  <div className="product_item_skelliton">No post abalable</div>
               )
            }
         </div>
      </>

   )

}