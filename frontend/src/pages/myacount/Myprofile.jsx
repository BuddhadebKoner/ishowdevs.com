import React, { useContext } from 'react';
import { PublicContext } from '../../context/public.context';
import Profileeditcard from '../../components/Myacount/ProfileCarddetails';

export default function MyAccount() {
   const { userData, isLoggedIn } = useContext(PublicContext);


   // for testing
   // const userData = {
   //    "_id": "66cd6090ee8ea91e80767c08",
   //    "username": "srgoramos",
   //    "fullName": "Gourav Ganguly",
   //    "email": "srgoramos@gmail.com",
   //    "avatar": "https://res.cloudinary.com/dsfztnp9x/image/upload/v1724268582/cieg5qs9ryg7arxbioym.webp",
   //    "isVarified": false,
   //    "portfolio": "http://localhost:5173/myacount",
   //    "mobile": "1986912869",
   //    "workAs": "App dev",
   //    "role": "user",
   //    "bio": "",
   //    "mediaLinks": "www.com",
   //    "keyWords": "app dev",
   //    "profileRich": 0,
   //    "happyCustomer": 0,
   //    "Userpost": [],
   //    "createdAt": "2024-08-27T05:13:52.623Z",
   //    "updatedAt": "2024-08-29T16:17:02.869Z"
   // }
   // const isLoggedIn = true;

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


   const formattedUpdatedAt = new Date(userData.updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });


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
            <p>Last updated at : {formattedUpdatedAt}</p>
         </div>
      </div>
   );
}
