import React from 'react';
import { assets } from '../../assets/assets';

export default function Cards({ user }) {

   const roleClasses = {
      user: 'bg-[#3FA2F6]',
      admin: 'bg-[#A10091]',
      team: 'bg-[#3FA2F6]',
   };

   const themeClasses = roleClasses[user.role] || 'bg-gray-500 text-white';


   return (

      <>
         <div className="indivisual_dev_cards_box">
            <div className="dev_card_name_profile">
               <img src={user.avatar} alt="Profile" className="dev_card_profile_img" />
               <div className="dev_card_name_varify_tick_role">
                  <div className="dev_card_name_varify_tick">
                     <h1>{user.fullName}</h1>
                     {user.isVarified && (
                        <img src={assets.varified} alt="Verified" />
                     )}
                  </div>
                  <p className="dev_card_profile_role">({user.role})</p>
               </div>
            </div>
            <div className="dev_card_service">
               <p>Work As</p>
               <p>{user.workAs}</p>
            </div>
            <div className="dev_card_user_rich">
               <div className="dev_card_user_richable">
                  <img src={assets.customerRich} alt="Rich Icon" className="dev_card_user_icons" />
                  <p>
                     Rich<br />{user.profileRich}+
                  </p>
               </div>

               <div className="dev_card_user_service">
                  <img src={assets.customerService} alt="Service Icon" className="dev_card_user_icons" />
                  <p>
                     Service<br />{user.happyCustomer}+
                  </p>
               </div>
            </div>
            <div className={`dev_card_see_profile_btn ${themeClasses}`}>
               <button className='see_profile'>
                  See Profile
               </button>
            </div>
         </div>
      </>

   )

}