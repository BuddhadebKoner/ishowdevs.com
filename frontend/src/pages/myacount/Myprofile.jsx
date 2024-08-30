import React, { useContext, useState } from 'react';
import { PublicContext } from '../../context/public.context';
import Profileeditcard from '../../components/Myacount/ProfileCarddetails';
import { UserContext } from '../../context/user.context';

export default function MyAccount() {
   const { userData, isLoggedIn } = useContext(PublicContext);
   const { handelAvatarChange, avatarUploading } = useContext(UserContext)

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
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
   });


   return (
      <div className="my_profile_details_container">
         <div className="profile_name_details_box">
            <div className="profile_avatar">
               <label htmlFor="avatarUpload" className="upload_avatar_label">
                  {
                     avatarUploading ? (
                        <img src={avatar} alt={fullName} className="avatar_image" />
                     ) : (
                        <>
                           <img src={avatar} alt={fullName} className="avatar_image" />
                           <input
                              type="file"
                              id="avatarUpload"
                              className="upload_avatar_input"
                              accept="image/*"
                              onChange={(e) => handelAvatarChange(e.target.files[0])}
                           />
                        </>
                     )
                  }
               </label>
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
            avatar={avatar}
         />
         <div className="profile_last_updated_box">
            <p>Last updated at : {formattedUpdatedAt}</p>
         </div>
      </div>
   );
}
