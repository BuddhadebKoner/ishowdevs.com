import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { PublicContext } from '../../context/public.context';

export default function Cards({ user }) {
   const { handelPublicUserPostByid } = useContext(PublicContext);
   const navigate = useNavigate();

   const roleClasses = {
      user: 'bg-[#3FA2F6]',
      admin: 'bg-[#A10091]',
      team: 'bg-[#3FA2F6]',
   };

   const themeClasses = roleClasses[user.role] || 'bg-gray-500 text-white';

   const handleSeeProfile = () => {
      console.log('See Profile');
      handelPublicUserPostByid(user._id);

      // Use navigate to redirect to the profile page with the username in the URL
      navigate(`/public/${user.username}`);
   };


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
               <p className='dev_card_work_as'>Work As</p>
               <p className='dev_card_work_as_text'>{user.workAs}</p>
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
               <button className='see_profile' onClick={handleSeeProfile}>
                  See Profile
               </button>
            </div>
         </div >
      </>
   )
}