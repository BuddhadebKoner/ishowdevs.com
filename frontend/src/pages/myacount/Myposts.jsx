import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import Prevposts from '../../components/Myacount/Prevposts';
import { PublicContext } from '../../context/public.context';
import { Link } from 'react-router-dom';

export default function myacount() {
   const { userData, isLoggedIn } = useContext(PublicContext);

   // Handle null or undefined userData
   if (!userData || !isLoggedIn) {
      return <h1>Not logged in or no user data available</h1>;
   }

   return (

      <>
         <Link to={"/myacount/addpost"} className="add_newpost_container">
            <p>Add new post</p>
            <img src={assets.addbtn} alt="" />
         </Link>
         <div className="previous_post_container">
            <p>Previous posts</p>
            <Prevposts
               userid={userData._id}
            />
         </div>
      </>

   )

}