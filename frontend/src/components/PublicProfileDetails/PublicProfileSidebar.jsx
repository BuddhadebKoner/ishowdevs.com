import React from 'react';
import { assets } from '../../assets/assets';

export default function PublicProfileDetails({ publicAccountShow }) {

   return (

      <>
         {
            publicAccountShow == null ?
               (
                  <h1>not found</h1>
               ) : (
                  <>
                     <div className="public_profile_details_sidebar_container">
                        <div className="avatar_section">
                           <img src={publicAccountShow?.avatar} alt={publicAccountShow?.fullName} className="avatar_image" />
                        </div >
                        <div className="profile_details_section">
                           <div className="dev_card_name_varify_tick">
                              <h1>{publicAccountShow.fullName}</h1>
                              {publicAccountShow.isVarified && (
                                 <img src={assets.varified} alt="Verified" /> 
                              )}
                           </div>
                           <p className="username">@{publicAccountShow?.username}</p>
                           <p className="role">{publicAccountShow?.workAs}</p>
                           <a href={publicAccountShow?.portfolio} className="portfolio_link" target="_blank" rel="noopener noreferrer">
                              {publicAccountShow?.portfolio}
                           </a>
                           <p className="media_link">
                              <a href={publicAccountShow?.mediaLinks} target="_blank" rel="noopener noreferrer">Social Media</a>
                           </p>
                        </div>
                        <div className="dev_card_user_rich dev_card_user_rich_public_profile">
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
                     </div >
                  </>
               )
         }
         {/* Profile Sidebar */}

      </>

   )

}