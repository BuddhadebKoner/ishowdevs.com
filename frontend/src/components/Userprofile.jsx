import React, { useContext, useMemo } from 'react';
import Notificationlevel from '../components/Notificationlevel';
import { UserContext } from '../context/user.context';
import '../styles/Userprofile.css';
import { assets } from '../assets/assets';

export default function Userprofile() {
   const { userdetails, handleLogout } = useContext(UserContext);

   // const temp =
   // {
   //    "username": "ishospeed",
   //    "fullName": "ishow speed",
   //    "email": "ishospeed@gmail.com",
   //    "password": "$2b$10$jTFXZiNmPcfhxuAdufT4dOyUEw0.v5Fqx4co6qYMmfLscvDP2Skwq",
   //    "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1723913394/zenvug8bqkk88zfp8nwa.jpg",
   //    "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1723913395/ga9fa8xvsw1xsnzdyvel.webp",
   //    "isVarified": false,
   //    "portfolio": "example.com",
   //    "mobile": "+91 8900280349",
   //    "workAs": "softwer dev",
   //    "role": "user",
   //    "bio": "not in mood",
   //    "mediaLinks": [
   //       "\"https://github.com/BuddhadebKoner\""
   //    ],
   //    "keyWords": [
   //       "\"app dev\""
   //    ],
   //    "isActive": false,
   //    "createdAt": {
   //       "$date": "2024-08-17T16:49:56.409Z"
   //    },
   //    "updatedAt": {
   //       "$date": "2024-08-17T16:50:22.050Z"
   //    },
   //    "__v": 0,
   //    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmMwZDRiNGUxOTViMDdiNThmNDg0YWQiLCJpYXQiOjE3MjM5MTM0MjIsImV4cCI6MTcyNjUwNTQyMn0.nS4sir_3n2oQ3b5qSUvq_tToTAfHcNZwYnFrZkztBKs"
   // }

   const userData = useMemo(() => ({
      // ...userdetails
      ...userdetails
   }), [userdetails]);

   function getMediaIcon(url) {
      if (url.includes('linkedin.com')) return assets.linkedin;
      if (url.includes('x.com')) return assets.x;
      if (url.includes('github.com')) return assets.github;
      if (url.includes('instagram.com')) return assets.insta;
      if (url.includes('portfolio.com')) return assets.portfolio;
      if (url.includes('threads.net')) return assets.threads;
      return '';
   }

   return (
      <>
         <Notificationlevel
            note={`Hi ${userData.fullName || 'Devaloper'}, Welcome to your profile. Do you want a blue badge?`}
            linkText="Get Verified"
            link=""
         />
         <div className="my_profile_container">
            <div className="my_profile_box">
               <div className="my_profile_head_container">
                  <div className="my_profile_cover_image">
                     <img src={userData.coverImage || assets.defaultCover} alt="cover image" /> {/* Added default cover image */}
                  </div>
                  <div className="my_profile_avatar">
                     <img src={userData.avatar || assets.defaultAvatar} alt="avatar" /> {/* Added default avatar */}
                  </div>
                  <div className="my_profile_name">
                     <div className="profile_name_username">
                        <div className="name_and_varifyed_batch">
                           <h1>{userData.fullName}</h1>
                           {userData.isVarified && <img className='varified_batch' src={assets.varified} alt="Verified badge" />} {/* Added alt text */}
                        </div>
                        <h2>@{userData.username}</h2>
                     </div>
                     <button className='edit_btn_profile'>Edit Info</button>
                  </div>
               </div>
               <div className="my_profile_details_container">
                  <div className="bio_fild_section">
                     <h2>Bio</h2>
                     <p>{userData.bio || 'No bio available'}</p> {/* Added default bio */}
                  </div>
                  <div className="contact_fild_section">
                     <h2>Contact</h2>
                     <div className="contact_fild">
                        <div className="contact_fild_item">
                           <p>Email: {userData.email || 'No email provided'}</p> {/* Added default email */}
                           <p>Mobile: {userData.mobile || 'No mobile number provided'}</p> {/* Added default mobile */}
                        </div>
                     </div>
                  </div>
                  <div className="role_fild_section">
                     <h2>Role</h2>
                     <a href={userData.portfolio} target='_blank' rel="noopener noreferrer"> {/* Added security for external links */}
                        <p className='role_workAs'>{userData.workAs || 'Not specified'}
                           <img src={assets.forword_arrow} alt="Forward arrow" className='forword_arrow_icon' />
                           <span className='role_workAs_batchs'>see works</span> {/* Changed <p> to <span> for better semantics */}
                        </p>
                     </a>
                  </div>
                  <div className="medialinks_fild_section">
                     <h2>Media</h2>
                     <div className="medialinks_fild">
                        {
                           userData.mediaLinks?.map((link, index) => (
                              <div key={index} className="medialinks_fild_item">
                                 <a href={link} target='_blank' rel="noopener noreferrer">
                                    <img src={getMediaIcon(link)} alt="Media icon" />
                                 </a>
                              </div>
                           )) || <p>No media links available</p> // Added default media links text
                        }
                     </div>
                  </div>
                  <div className="keywords_fild_section">
                     <h2>Key Words</h2>
                     <div className="keywords_fild">
                        {
                           userData.keyWords?.map((key, index) => (
                              <div key={index} className="keywords_fild_item">
                                 <p>{key}</p>
                              </div>
                           )) || <p>No keywords available</p> // Added default keywords text
                        }
                     </div>
                  </div>
                  <div className="change_password_logout_btn">
                     <button className='change_password_btn hero_btn' >Change Password</button>
                     <button className='logout_btn hero_btn' onClick={() => { handleLogout() }}>Logout</button>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
