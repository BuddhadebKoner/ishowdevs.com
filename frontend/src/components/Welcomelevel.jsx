import React from 'react';

export default function components({ fullName = "Dear !" }) {

   return (

      <>
         <div className="welcome_level_home">
            <h1 className="welcome_level_title">Hi {fullName} !</h1>
            <p className="welcome_level_text">Welcome To Code Bridge</p>
         </div>
      </>

   )

}