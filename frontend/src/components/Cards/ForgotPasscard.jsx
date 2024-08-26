import React from 'react';

export default function Cards() {

   return (

      <>
         <div className="welcome_level_login">
            <h1 className='welcome_level_login_big_text'>Opps !</h1>
            <h1 className='welcome_level_login_small_text'>Dont wary within few hour  you will be notified in email 
            </h1>
         </div>
         <div className="auth_card">
            <div className="form_group">
               <label htmlFor="email">Enter Registered Email Address*</label>
               <input type="email" className="form_control" id="email" placeholder="Enter Your Email" autoComplete='off'
                  list='none' />
            </div>
            <button type="submit" className="btn">Submit</button>
         </div>
      </>
   )

}