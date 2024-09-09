import React, { useContext, useState } from 'react';
import '../styles/Explore.css';
import Allpostfilter from '../components/Allpostfilter/Allpost';
import { PublicContext } from '../context/public.context';

export default function Pages() {
   const { explorePosts } = useContext(PublicContext);
   const [selectedTag, setSelectedTag] = useState('All post');

   // Filter posts based on the selected tag
   const filteredPosts = selectedTag === 'All post'
      ? explorePosts
      : explorePosts.filter(post => post.tags === selectedTag);

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
                  onClick={() => setSelectedTag('All post')}
               >
                  All post
               </li>
               <li
                  className={getLiClass('Web Developer')}
                  onClick={() => setSelectedTag('Web Developer')}
               >
                  Web Developer
               </li>
               <li
                  className={getLiClass('Designer')}
                  onClick={() => setSelectedTag('Designer')}
               >
                  Designer
               </li>
               <li
                  className={getLiClass('App Devaloper')}
                  onClick={() => setSelectedTag('App Devaloper')}
               >
                  App Devaloper
               </li>
               <li
                  className={getLiClass('Artificial Intelligence')}
                  onClick={() => setSelectedTag('Artificial Intelligence')}
               >
                  Artificial Intelligence
               </li>
               <li
                  className={getLiClass('Material')}
                  onClick={() => setSelectedTag('Material')}
               >
                  Material
               </li>
            </div>
         </div>
         <Allpostfilter explorePosts={filteredPosts} />
      </>
   );
}
