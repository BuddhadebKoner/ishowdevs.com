import React from 'react';
import '../styles/ContributersCards.css';
import { assets } from '../assets/assets';

export default function ContributersCards({
   sliderLoading,
   fullName,
   avatar,
   isVarified,
   role,
   keywords,
   userid,
   profileRich,
   happyCustomer,
   workAs,
   isActive,
}) {


   const roleClasses = {
      user: 'bg-[#3FA2F6] ',
      admin: 'bg-[#A10091] ',
      team: 'bg-[#1A5319] ',
   };

   const themeClasses = roleClasses[role] || 'bg-gray-500 text-white';

   return (
      <>
         {(!sliderLoading) ? (
            <div className={`contributers_card_container`}>
               <div className="contributers_card_image_box">
                  <img src={avatar} alt={fullName} />
               </div>
               <div className="contributers_card_details_box">
                  <div className="profile_details_sec">
                     <div className="peofile_name_sec">
                        <div className="peofile_name_and_batch">
                           <h1>{fullName}</h1>
                           {isVarified && <img src={assets.varified} alt="Verified" />}
                           <p>({role})</p>
                        </div>
                        <h1 className='profile_working_status'>{workAs}</h1>
                     </div>
                     <div className="profile_service_sec">
                        <h1 >Services</h1>
                        <div className="services_batches_container">
                           {
                              keywords.split(',').map((keyword, index) => (
                                 <div className={`services_batches ${themeClasses}`} key={index}>
                                    <p>{keyword.trim()}</p>
                                 </div>
                              ))
                           }
                        </div>
                     </div>
                     <div className="profile_statistic_sec">
                        <div className="profile_statistic_rich">
                           <img src={assets.customerRich} alt="Customer Rich" />
                           <div className="rech_details">
                              <p>Rich</p>
                              <p>{profileRich}</p>
                           </div>
                        </div>
                        <div className="profile_statistic_rich">
                           <img src={assets.customerService} alt="Customer Service" />
                           <div className="rech_details">
                              <p>Service</p>
                              <p>{happyCustomer}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={`contributers_card_contact_level ${themeClasses}`}>
                     {/* Add any additional content here */}
                  </div>
               </div>
            </div>
         ) : (
            <h1>loading</h1>
         )}
      </>
   );
}
