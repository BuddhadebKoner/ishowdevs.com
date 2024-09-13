import React, { useContext, useEffect, useState } from 'react';
import PublicProfileDetails from '../components/PublicProfileDetails/PublicProfileSidebar';
import PublicProfilePosts from '../components/PublicProfileDetails/PublicProfilePosts';
import { PublicContext } from '../context/public.context';
import '../styles/Publicaccount.css';

export default function Pages() {
   const { publicAccountShow } = useContext(PublicContext);
   const [publicData, setPublicData] = useState({
      user: null,
      posts: null
   });

   useEffect(() => {
      const storedData = localStorage.getItem('publicAccountData');
      if (storedData) {
         setPublicData(JSON.parse(storedData));
      } else {
         if (publicAccountShow?.user || publicAccountShow?.posts) {
            setPublicData(publicAccountShow);
            localStorage.setItem('publicAccountData', JSON.stringify(publicAccountShow));
         }
      }
   }, [publicAccountShow]);

   useEffect(() => {
      if (publicAccountShow?.user || publicAccountShow?.posts) {
         localStorage.setItem('publicAccountData', JSON.stringify(publicAccountShow));
         setPublicData(publicAccountShow);
      }
   }, [publicAccountShow]);

   return (
      <div className="public_account_container">
         <PublicProfileDetails publicAccountShow={publicData.user} />
         <PublicProfilePosts publicAccountShow={publicData.posts} />
      </div>
   );
}
