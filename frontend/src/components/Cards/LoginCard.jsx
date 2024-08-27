import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

export default function Cards() {
   const {
      setLoginUsername,
      setLoginPassword,
      handelLogin,
   } = useContext(UserContext)


   return (

      <>
         <div className="welcome_level_login">
            <h1 className='welcome_level_login_big_text'>Sign In to Your Account</h1>
            <h1 className='welcome_level_login_small_text'>You don’t have account ?
               <span >
                  <Link to={"/registeruser"} className='signup_Link'>
                     sign up
                  </Link>
               </span>
            </h1>
         </div>
         <div className="auth_card">
            <div className="form_group">
               <label htmlFor="email">Username or Email*</label>
               <input
                  type="email"
                  className="form_control"
                  id="email"
                  placeholder="Enter Your username"
                  autoComplete='off'
                  onChange={(e) => setLoginUsername(e.target.value)}
               />
            </div>
            <div className="form_group">
               <label htmlFor="password">Password*</label>
               <input
                  type="password"
                  className="form_control"
                  id="password"
                  placeholder="Enter Your Password"
                  autoComplete='off'
                  onChange={(e) => setLoginPassword(e.target.value)}
               />
            </div>
            <button type="submit" className="btn" onClick={() => { handelLogin() }}>SIGN IN</button>
            <div className="forgot_password">
               <Link to={"/forgotpassword"}>Forgot Password?</Link>
            </div>
         </div>
      </>

   )

}