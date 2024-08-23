import React, { useContext, useMemo  } from 'react';
import { PublicContext } from '../context/public.context';
import Notificationlevel from '../components/Notificationlevel';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

export default function components() {
   // public context
   const { watchingProfile } = useContext(PublicContext);


   const userData = useMemo(() => ({
      // ...userdetails
      ...watchingProfile
   }), [watchingProfile]);

   function getMediaIcon(url) {
      if (url.includes('linkedin.com')) return assets.linkedin;
      if (url.includes('x.com')) return assets.x;
      if (url.includes('github.com')) return assets.github;
      if (url.includes('instagram.com')) return assets.insta;
      if (url.includes('portfolio.com')) return assets.portfolio;
      if (url.includes('threads.net')) return assets.threads;
      return assets.defaulticon;
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
                     <button className='edit_btn_profile'>Works</button>
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
                                    <img src={getMediaIcon(link)} alt="" />
                                 </a>
                              </div>
                           )) || <p>No media links available</p>
                        }
                     </div>
                  </div>
                  <div className="keywords_fild_section">
                     <h2>Key Words</h2>
                     <div className="keywords_fild">
                        {
                           userData.keyWords
                              ? userData.keyWords.split(',').map((key, index) => (
                                 <div key={index} className="keywords_fild_item">
                                    <p>{key.trim()}</p> {/* Trim to remove any extra spaces */}
                                 </div>
                              ))
                              : <p>No keywords available</p> // Added default keywords text
                        }

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>

   )

}