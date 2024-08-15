import React from 'react';
import Herotext from './Herotext';
import '../styles/Userlogin.css';
import { assets } from '../assets/assets';

export default function components() {

   return (
      <>
         <div className="userlogin_form_container">
            <Herotext text={'Hi fox !'} />
            <div className="userlogin_form">
               <div className="input_fild_box">
               <label htmlFor="username">Enter Your  Username / Email</label>
                  <input type="text" name="username" id="username" placeholder='Enter your username or email' />
               </div>
               <div className="input_fild_box">
               <label htmlFor="password">Enter Your Password</label>
                  <input type="password" name="password" id="password" placeholder='Enter your username or email' />
               </div>
               <div className="capture_code">
                  <input type="text" value={"Ex7u9T"} />
                  <img src={assets.reloadicon} alt="" />
               </div>
               <div className="input_fild_box">
               <label htmlFor="">Enter Capture code</label>
                  <input type="text" name="capture" id="capture" placeholder='Enter capture code' />
               </div>
               <div className="loginsubmit_btns">
                  <button className=''>Login</button>
                  <button className=''>Cancle</button>
               </div>
            </div>
         </div>
      </>

   )

}