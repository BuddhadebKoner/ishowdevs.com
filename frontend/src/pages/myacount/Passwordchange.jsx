import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';


export default function pages() {
   const {
      setOldPassword,
      setNewPassword,
      handelPasswordChange
   } = useContext(UserContext);


   return (

      <>
         <div className="myprofile_chnagepassword_container">
            <div className="auth_card">
               <div className="form_group">
                  <label htmlFor="oldpassword">Old Password</label>
                  <input
                     type="text"
                     className="form_control"
                     id="oldpassword"
                     placeholder="Enter Your Old Password"
                     autoComplete='off'
                     onChange={(e) => setOldPassword(e.target.value)}
                  />
               </div>
               <div className="form_group">
                  <label htmlFor="newPassword">New Password*</label>
                  <input
                     type="text"
                     className="form_control"
                     id="newPassword"
                     placeholder="Enter Your New Password"
                     autoComplete='off'
                     onChange={(e) => setNewPassword(e.target.value)}
                  />
               </div>
               <button type="submit" className="btn" onClick={() => { handelPasswordChange() }}>Chnage Password</button>
               <div className="forgot_password">
                  <Link to={"/forgotpassword"}>Forgot Password?</Link>
               </div>
            </div>
         </div>
      </>

   )

}