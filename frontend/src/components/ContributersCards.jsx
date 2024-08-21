import React from 'react';
import '../styles/ContributersCards.css';
import { assets } from '../assets/assets';
export default function components() {

   return (

      <>
         <div className="contributers_card_container">
            <div className="contributers_card_image_box">
               <img src={assets.temp} alt="" />
            </div>
            <div className="contributers_card_details_box">
               <div className="profile_details_sec">
                  <div className="peofile_name_sec">
                     <div className="peofile_name_and_batch">
                        <h1>Buddhadeb Koner</h1>
                        <img src={assets.varified} alt="" />
                        <p>(Admin)</p>
                     </div>
                     <h1 className='profile_working_status'>Web devaloper</h1>
                  </div>
                  <div className="profile_service_sec">
                     <h1>Services</h1>
                     <div className="services_batches_container">
                        <div className="services_batches">
                           <p>Web devaloper</p>
                        </div>
                        <div className="services_batches">
                           <p>Web devaloper</p>
                        </div>
                     </div>
                  </div>
                  <div className="profile_statistic_sec">
                     <div className="profile_statistic_rich">
                        <img src={assets.customerRich} alt="" />
                        <div className="rech_details">
                           <p>Rich</p>
                           <p>100</p>
                        </div>
                     </div>
                     <div className="profile_statistic_rich">
                        <img src={assets.customerService} alt="" />
                        <div className="rech_details">
                           <p>Service</p>
                           <p>14</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="contributers_card_contact_level">
               </div>
            </div>
         </div>
      </>

   )

}