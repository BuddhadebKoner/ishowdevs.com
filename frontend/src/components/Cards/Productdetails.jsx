import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicContext } from '../../context/public.context';

export default function Cards({ post }) {
   const { setPublicPost } = useContext(PublicContext);
   const navigate = useNavigate();

   const publicPostClicked = () => {
      setPublicPost(post); 
      navigate(`/post/${post._id}`, { state: { post } });  
   };


   return (
      <div className="indivisual_dev_cards_box_products" onClick={publicPostClicked}>
         <div className="dev_products_image_box">
            <img src={post.image} alt="" className='dev_products_image' />
         </div>
         <h1 className='dev_products_title'>{post.title}</h1>
         <h1 className='dev_products_content'>
            {post.content.split(" ").length > 10
               ? `${post.content.split(" ").slice(0, 10).join(" ")} ....`
               : post.content}
         </h1>
         <div className="dev_product_prise">
            <div className="prise_container">
               <p className='priseBefore'>
                  <span>₹</span>
                  {post.priseBefore.toLocaleString('en-IN')}
                  <span>/-</span>
               </p>
               <p className='priseNow'>
                  {post.priseNow === 0 ? (
                     <span>Free</span>
                  ) : (
                     <>
                        <span>₹</span>
                        {post.priseNow.toLocaleString('en-IN')}
                        <span>/-</span>
                     </>
                  )}
               </p>
            </div>
            <button className='buynow_btn_product_card'>Buy now</button>
         </div>
      </div>
   );
}
