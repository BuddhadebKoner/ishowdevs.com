import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';

export default function Cards() {
   const {
      setFullName,
      setUsername,
      setEmail,
      setPassword,
      handelUserRegister,
   } = useContext(UserContext)

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
               <label htmlFor="fullName">Full Name*</label>
               <input
                  type="fullName"
                  className="form_control"
                  id="fullName"
                  placeholder="Enter Your Full Nanme"
                  autoComplete='off'
                  list='none'
                  onChange={(e) => setFullName(e.target.value)}
               />
            </div>
            <div className="form_group">
               <label htmlFor="Username">Username*</label>
               <input
                  type="Username"
                  className="form_control"
                  id="Username"
                  placeholder="Enter Your username"
                  autoComplete='off'
                  list='none'
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className="form_group">
               <label htmlFor="email">Email*</label>
               <input
                  type="email"
                  className="form_control"
                  id="email"
                  placeholder="Enter Your Working email"
                  autoComplete='off'
                  list='none'
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="form_group">
               <label htmlFor="password">Password*</label>
               <input
                  type="text"
                  className="form_control"
                  id="password"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <button type="submit" className="btn" onClick={() => { handelUserRegister() }}>SIGN IN</button>
            <div className="forgot_password">
               <h1>Already Have An Account?</h1>
               <Link to={"/login"}>Sign in</Link>
            </div>

         </div>
      </>

   )

}