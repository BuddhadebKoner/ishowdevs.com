import React from 'react';
import Notificationlevel from './Notificationlevel';
import Herotext from './Herotext';

export default function components() {

   return (

      <>
         <Notificationlevel
            note="To be our team member sign up or contact with website admin"
            link="/registeruser"
            linkText="Create Account"
         />
         <div className="userlogin_form_container">
            <Herotext text="Hi fox!" />
            <div className="userlogin_form">
               <div className="input_fild_box">
                  <label htmlFor="username">Current Password</label>
                  <input
                     type="text"
                     name="username"
                     id="username"
                     autoComplete="off"
                     placeholder="Current password"
                     // onChange={handleInputChange(setOldPassword)}
                     required
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="password">New Password</label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     autoComplete="off"
                     placeholder="Enter New password"
                     // onChange={handleInputChange(setNewPassword)}
                     required
                  />
               </div>
               <div className="loginsubmit_btns">
                  <button
                     // onClick={handelChangepassword}
                     className="login_form_submit_btn login"
                  >
                     Chnage Password
                  </button>
                  <button className="login_form_submit_btn cancel">
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </>

   )

}