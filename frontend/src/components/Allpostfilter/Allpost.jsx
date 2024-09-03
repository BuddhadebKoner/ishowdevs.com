import React, { useState, useEffect, useContext } from 'react';
import Productdeatails from '../Cards/Productdetails';

export default function Allpostfilter({ explorePosts }) {


   const [visiblePosts, setVisiblePosts] = useState(6);
   const postsPerPage = 3;
   const hasMorePosts = visiblePosts < explorePosts.length;
   const currentPosts = explorePosts.slice(0, visiblePosts);

   const handleLoadMore = () => {
      setVisiblePosts(prevVisible => Math.min(prevVisible + postsPerPage, explorePosts.length));
   };
   return (

      <>
         <div className="explore_post_container">
            {currentPosts.map(post => (
               <Productdeatails key={post._id} post={post} />
            ))}
            {/* See More Button */}
         </div>
         {hasMorePosts && (
            <div className="see-more-container">
               <button onClick={handleLoadMore}>See More</button>
            </div>
         )}
      </>

   )

}