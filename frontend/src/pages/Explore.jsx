import React, { useContext, useEffect, useState } from 'react';
import '../styles/Explore.css';
import Allpostfilter from '../components/Allpostfilter/Allpost';
import { PublicContext } from '../context/public.context';

export default function Pages() {
   const { handleExplorePostByTags, selectedTag } = useContext(PublicContext);
   const [filteredPosts, setFilteredPosts] = useState([]);

   useEffect(() => {
      const posts = handleExplorePostByTags(selectedTag);
      setFilteredPosts(posts);
   }, [selectedTag, handleExplorePostByTags]);

   const getLiClass = (tag) => (
      `cursor-pointer py-2 px-4 rounded-lg 
      ${selectedTag === tag ? 'bg-blue-500 text-white' : 'text-gray-700'} `
   );

   return (
      <>
         <div className="explore_navbar_container">
            <div className="explore_navbar_links flex space-x-4">
               <li
                  className={getLiClass('All post')}
                  onClick={() => handleExplorePostByTags('All post')}
               >
                  All post
               </li>
               <li
                  className={getLiClass('Web Developer')}
                  onClick={() => handleExplorePostByTags('Web Developer')}
               >
                  Web Developer
               </li>
               <li
                  className={getLiClass('Designer')}
                  onClick={() => handleExplorePostByTags('Designer')}
               >
                  Designer
               </li>
               <li
                  className={getLiClass('App Developer')}
                  onClick={() => handleExplorePostByTags('App Developer')}
               >
                  App Developer
               </li>
               <li
                  className={getLiClass('Artificial Intelligence')}
                  onClick={() => handleExplorePostByTags('Artificial Intelligence')}
               >
                  Artificial Intelligence
               </li>
               <li
                  className={getLiClass('metarial')}
                  onClick={() => handleExplorePostByTags('metarial')}
               >
                  Metarial
               </li>
            </div>
         </div>
         <Allpostfilter explorePosts={filteredPosts} />
      </>
   );
}
