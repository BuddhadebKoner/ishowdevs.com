import React, { useContext } from 'react';
import { PublicContext } from '../context/public.context';
import { assets } from '../assets/assets';


export default function Pages() {
   const { publicAccountShow } = useContext(PublicContext);

   return (
      <>
         <div className="public_account_container">
            {/* Profile Sidebar */}
            <div className="public_profile_details_sidebar_container">
               <div className="avatar_section">
                  <img src={publicAccountShow?.avatar} alt={publicAccountShow?.fullName} className="avatar_image" />
               </div>
               <div className="profile_details_section">
                  <h2 className="full_name">{publicAccountShow?.fullName}</h2>
                  <p className="username">@{publicAccountShow?.username}</p>
                  <p className="role">{publicAccountShow?.workAs}</p>
                  <a href={publicAccountShow?.portfolio} className="portfolio_link" target="_blank" rel="noopener noreferrer">
                     {publicAccountShow?.portfolio}
                  </a>
                  <p className="media_link">
                     <a href={publicAccountShow?.mediaLinks} target="_blank" rel="noopener noreferrer">Social Media</a>
                  </p>
               </div>
               <div className="dev_card_user_rich">
                  <div className="dev_card_user_richable">
                     <img src={assets.customerRich} alt="Rich Icon" className="dev_card_user_icons" />
                     <p>
                        Rich<br />{publicAccountShow.profileRich}+
                     </p>
                  </div>

                  <div className="dev_card_user_service">
                     <img src={assets.customerService} alt="Service Icon" className="dev_card_user_icons" />
                     <p>
                        Service<br />{publicAccountShow.happyCustomer}+
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
