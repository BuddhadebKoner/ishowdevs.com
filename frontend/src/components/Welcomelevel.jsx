import React from 'react';

export default function components({ fullName = "Fox ", isBatchShow = false }) {

   return (

      <>
         <div className="welcome_level_home">
            <h1 className="welcome_level_title">Hi {fullName} !</h1>
            <div className="wellcome_message_container_text">
               <p className="welcome_level_text">
                  Welcome to IShowdevs.com&nbsp;
               </p>
               {
                  isBatchShow && (
                     <p className='heading_short_message'>
                        ZERO platform fees
                     </p>
                  )
               }
            </div>
         </div>
      </>

   )

}