import React from 'react';

export default function Cards({ post }) {
   return (

      <>
         <div className="indivisual_dev_cards_box_products">
            <div className="dev_products_image_box">
               <img src={post.image} alt="" className='dev_products_image' />
            </div>
            <h1 className='dev_products_title'>{post.title}</h1>
            <h1 className='dev_products_content'>{post.content}</h1>
            <div className="dev_product_prise">
               <div className="prise_container">
                  <p className='priseBefore'>
                     <span>₹</span>
                     {post.priseBefore}
                     <span>/-</span>
                  </p>
                  <p className='priseNow'>
                     {post.priseNow === 0 ? (
                        <span>Free</span>
                     ) : (
                        <>
                           <span>₹</span>
                           {post.priseNow}
                           <span>/-</span>
                        </>
                     )}
                  </p>
               </div>
               <button className='buynow_btn_product_card'>Buy now</button>
            </div>
         </div>
      </>
   )

}