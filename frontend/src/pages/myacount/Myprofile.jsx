import React, { useContext } from 'react';
import { PublicContext } from '../../context/public.context';
import Profileeditcard from '../../components/Myacount/Profileeditcard';

export default function MyAccount() {
   const { userData, isLoggedIn } = useContext(PublicContext);
   
   // Handle null or undefined userData
   if (!userData || !isLoggedIn) {
      return <h1>Not logged in or no user data available</h1>;
   }

   const {
      avatar = 'https://via.placeholder.com/150',
      fullName = 'No Name Provided',
      username = 'unknown',
      role = 'user',
      mobile = '+91 ',
      portfolio = '',
      workAs = 'Not specified',
      keyWords = 'None',
      mediaLinks = "",
   } = userData;

   return (
      <div className="my_profile_details_container">
         <div className="profile_name_details_box">
            <div className="profile_avatar">
               <img src={avatar} alt={fullName} />
            </div>
            <div className="profile_name">
               <p>@{username}</p>
               <span>({role})</span>
            </div>
         </div>
         <Profileeditcard
            fullName={fullName}
            mobile={mobile}
            portfolio={portfolio}
            workAs={workAs}
            keyWords={keyWords}
            mediaLinks={mediaLinks}
            avatar={avatar}
         />
         <div className="profile_last_updated_box">
            <p>Account Last updated at: </p>
         </div>
      </div>
   );
}
