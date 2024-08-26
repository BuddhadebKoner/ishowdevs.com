import React from 'react';
import { Link } from 'react-router-dom';

export default function Cards() {

   return (

      <>
         <div className="welcome_level_login">
            <h1 className='welcome_level_login_big_text'>Ohh ! Create Account</h1>
            <h1 className='welcome_level_login_small_text'>Sign up for being our member
               <span >
                  <Link to={"/registeruser"} className='signup_Link'>
                     Turms & Conditions
                  </Link>
               </span>

            </h1>
         </div>
         <div className="auth_card">
            <div className="form_group">
               <label htmlFor="email">Full Name*</label>
               <input type="email" className="form_control" id="email" placeholder="Enter Your Full anme" autoComplete='off'
                  list='none' />
            </div>
            <div className="form_group">
               <label htmlFor="email">Username*</label>
               <input type="email" className="form_control" id="email" placeholder="Enter Your username" autoComplete='off'
                  list='none' />
            </div>
            <div className="form_group">
               <label htmlFor="email">Email*</label>
               <input type="email" className="form_control" id="email" placeholder="Enter Your Working email" autoComplete='off'
                  list='none' />
            </div>
            <div className="form_group">
               <label htmlFor="password">Password*</label>
               <input type="password" className="form_control" id="password" placeholder="Enter Your Password" />
            </div>
            <button type="submit" className="btn">SIGN IN</button>
            <div className="forgot_password">
               <h1>Already Have An Account?</h1>
               <Link to={"/login"}>Sign in</Link>
            </div>
         </div>
      </>

   )

}