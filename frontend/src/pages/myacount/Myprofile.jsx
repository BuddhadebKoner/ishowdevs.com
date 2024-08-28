import React, { useContext } from 'react';
import { PublicContext } from '../../context/public.context';
import Profileeditcard from '../../components/Myacount/Profilecditcard';

export default function MyAccount() {
   const { userData, isLoggedIn } = useContext(PublicContext);

   console.log('userData:', userData);
   
   // Handle null or undefined userData
   if (!userData || !isLoggedIn) {
      return <h1>Not logged in or no user data available</h1>;
   }

   const {
      avatar = 'https://via.placeholder.com/150',
      fullName = 'No Name Provided',
      username = 'unknown',
      role = 'user',
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
            fullName={userData.fullName}
            mobile={userData.mobile}
            portfolio={userData.portfolio}
            workAs={userData.workAs}
            keyWords={userData.keyWords}
            mediaLinks={userData.mediaLinks}
            avatar={userData.avatar}
         />
         <div className="profile_last_updated_box">
            <p>Account Last updated at: </p>
         </div>
      </div>
   );
}
