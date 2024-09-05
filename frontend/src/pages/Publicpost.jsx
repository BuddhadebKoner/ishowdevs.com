import React, { useContext, useEffect } from 'react';
import { PublicContext } from '../context/public.context';

export default function Pages() {
   const { publicPost, setPublicPost } = useContext(PublicContext);

   useEffect(() => {
      const savedPost = localStorage.getItem('publicPost');
      if (savedPost) {
         setPublicPost(JSON.parse(savedPost));
      }
   }, [setPublicPost]);

   return (
      <>
         {publicPost ? (
            <div className='publicpost_container'>
               <div className="heading_container_public_post_page">
                  <h1>For any payment or  contact to developer related issue contact us</h1>
               </div>
               <div className="publicpost_feature_product_container">
                  <h1>Try the Product</h1>
                  <div className="publicpost_ifream_container">
                     <iframe src={publicPost.projectLink} frameborder="0"></iframe>
                  </div>
               </div>
            </div>
         ) : (
            <p>No post selected.</p>
         )}
      </>
   );
}
