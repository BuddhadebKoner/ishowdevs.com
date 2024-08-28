import React, { useContext } from 'react';
// import { PublicContext } from '../../context/public.context';
import Profileeditcard from '../../components/Myacount/Profileeditcard';

export default function MyAccount() {
   // const { userData, isLoggedIn } = useContext(PublicContext);

   // if (!isLoggedIn) return null;

   const userData =
   {
      "_id": {
         "$oid": "66cb6bfc9e2aa26535582c5f"
      },
      "username": "jeetkoener",
      "fullName": "Jeet Koner",
      "email": "jeetkoenr@gmail.com",
      "password": "$2b$10$Odcedk7s.Vf3BzYb.U7ln./kBbZXAib9AWjust9zebOK2XFa49IDC",
      "avatar": "https://res.cloudinary.com/dsfztnp9x/image/upload/v1724268582/cieg5qs9ryg7arxbioym.webp",
      "isVarified": false,
      "portfolio": "",
      "mobile": "",
      "workAs": "Web devaloper",
      "role": "user",
      "bio": "",
      "mediaLinks": [
         ""
      ],
      "keyWords": "",
      "isActive": true,
      "showOnHomePage": true,
      "profileRich": 100,
      "happyCustomer": 20,
      "Userpost": [],
      "createdAt": {
         "$date": "2024-08-25T17:38:04.441Z"
      },
      "updatedAt": {
         "$date": "2024-08-25T17:38:04.441Z"
      },
      "__v": 0
   }

   return (
      <div className="my_profile_details_container">
         <div className="profile_name_details_box">
            <div className="profile_avatar">
               <img src={userData.avatar} alt={userData.fullName} />
            </div>
            <div className="profile_name">
               <p>@{userData.username}</p>
               <span>({userData.role})</span>
            </div>
         </div>
         <Profileeditcard
            fullName={userData.fullName}
            mobile={userData.mobile}
            portfolio={userData.portfolio}
            workAs={userData.workAs}
            keyWords={userData.keyWords}
            mediaLinks={userData.mediaLinks}
         />
         <div className="profile_last_updated_box">
            <p>Account Last updated at: {new Date(userData.updatedAt).toDateString()}</p>
         </div>
      </div>
   );
}
