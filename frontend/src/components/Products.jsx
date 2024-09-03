import React, { useContext } from 'react';
import Productdetails from './Cards/Productdetails';
import { PublicContext } from '../context/public.context';
import { Link } from 'react-router-dom';

export default function ProductSection() {
   const { userpost } = useContext(PublicContext);



   return (
      <>
         <div className="product_section_container">
            <h1 className='product_section_title'>
               Products
            </h1>
            <Link to={"/explore"} className='product_section_button'>
               See More
            </Link>
         </div>
         <div className="product_list">
            {
               userpost.length ? (
                  userpost && userpost
                     .map((post, index) => (
                        <div key={index} className="product_item">
                           <Productdetails post={post} />
                        </div>
                     ))
               ) : (
                  <div className="product_item_skelliton"></div>
               )
            }
         </div>
      </>
   );
}
