import React, { useContext } from 'react';
import '../styles/ContributersCards.css';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { PublicContext } from '../context/public.context';

export default function ContributersCards({ user, sliderLoading }) {
   // context api
   const { handlePublicProfileAccess } = useContext(PublicContext);


   const roleClasses = {
      user: 'bg-[#3FA2F6]',
      admin: 'bg-[#A10091]',
      team: 'bg-[#1A5319]',
   };

   const themeClasses = roleClasses[user.role] || 'bg-gray-500 text-white';

   if (sliderLoading) {
      return <h1>Loading...</h1>;
   }

   return (
      <Link to="/publicacount" onClick={() => handlePublicProfileAccess(user)}>
         <div className="contributers_card_container">
            <div className="contributers_card_image_box">
               <img src={user.avatar} alt={user.fullName} />
            </div>
            <div className="contributers_card_details_box">
               <div className="profile_details_sec">
                  <div className="peofile_name_sec">
                     <div className="peofile_name_and_batch">
                        <h1>{user.fullName}</h1>
                        {user.isVarified && <img src={assets.varified} alt="Verified" />}
                        <p>({user.role})</p>
                     </div>
                     <h1 className="profile_working_status">{user.workAs}</h1>
                  </div>
                  <div className="profile_service_sec">
                     <h1>Services</h1>
                     <div className="services_batches_container">
                        {user.keyWords ? (
                           user.keyWords.split(',').map((keyword, index) => (
                              <div className={`services_batches ${themeClasses}`} key={index}>
                                 <p>{keyword.trim()}</p>
                              </div>
                           ))
                        ) : (
                           <p>No services available</p>
                        )}
                     </div>
                  </div>
                  <div className="profile_statistic_sec">
                     <div className="profile_statistic_rich">
                        <img src={assets.customerRich} alt="Customer Rich" />
                        <div className="rech_details">
                           <p>Rich</p>
                           <p>{user.profileRich}</p>
                        </div>
                     </div>
                     <div className="profile_statistic_rich">
                        <img src={assets.customerService} alt="Customer Service" />
                        <div className="rech_details">
                           <p>Service</p>
                           <p>{user.happyCustomer}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className={`contributers_card_contact_level ${themeClasses}`}>
                  {/* Additional content can go here */}
               </div>
            </div>
         </div>
      </Link>
   );
}
