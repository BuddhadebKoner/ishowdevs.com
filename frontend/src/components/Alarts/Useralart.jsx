import React, { useEffect, useState } from 'react';
import '../../styles/Alerts.css';
import { assets } from '../../assets/assets';

export default function Alerts({ type = "offer", message, setAlert }) {
   const alertIcons = {
      error: assets.error,
      info: assets.info,
      success: assets.success,
      offer: assets.offer,
      warn: assets.warn,
   };

   const alertColors = {
      error: {
         background: '#FFC8C8',
         color: '#AC0100',
      },
      info: {
         background: '#C8E8FF',
         color: '#006DBC',
      },
      success: {
         background: '#C8FFCD',
         color: '#00BC13',
      },
      offer: {
         background: '#FFFFFF',
         color: '#000000',
      },
      warn: {
         background: '#FFF3C8',
         color: '#CB9E00',
      },
   };

   const alertText = {
      error: 'Error',
      info: 'Info',
      success: 'Success',
      offer: 'Offer',
      warn: 'Warning',
   };

   const [isVisible, setIsVisible] = useState(true);

   const handleClose = () => setIsVisible(false);

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
   }, []);

   return (
      isVisible && (
         <div
            className="alart_container"
            style={{ backgroundColor: alertColors[type].background }}
         >
            <div className="alart_container_head">
               <img
                  src={alertIcons[type]}
                  alt={type}
                  className="alart_container_head_type"
               />
               <h3 className='alart_container_head_type_text'>
                  {alertText[type]}
               </h3>
               <img
                  src={assets.close}
                  alt="Close"
                  className="alart_container_head_close"
                  onClick={handleClose}
               />
            </div>
            <div className="alart_container_content">
               <p>{message}</p>
            </div>
            <button
               className='alart_container_button'
               onClick={handleClose}
               style={{
                  backgroundColor: alertColors[type].color,
               }}
            >
               Agree
            </button>
         </div>
      )
   );
}
