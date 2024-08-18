import React, { useState, useEffect, useContext } from 'react';
import Herotext from './Herotext';
import '../styles/Userlogin.css';
import { assets } from '../assets/assets';
import Alerts from './Alarts/Useralart';
import Notificationlevel from './Notificationlevel';
import { UserContext } from '../context/user.context';

export default function UserLogin() {
   const [captureCode, setCaptureCode] = useState('');
   const [userEnteredCaptureCode, setUserEnteredCaptureCode] = useState('');
   const [wrongCaptureAlert, setWrongCaptureAlert] = useState(false);

   const { setUsername, setPassword, handleLogin } = useContext(UserContext);

   useEffect(() => {
      setCaptureCode(generateCaptureCode());
   }, []);

   const handleInputChange = (setter) => (e) => setter(e.target.value);

   const handleCaptureCode = () => setCaptureCode(generateCaptureCode());

   const handleLoginClick = async () => {
      if (!verifyCaptureCode(userEnteredCaptureCode)) {
         setWrongCaptureAlert(true);
         setCaptureCode(generateCaptureCode());
         setUserEnteredCaptureCode('');
         return;
      }

      await handleLogin();
   };

   return (
      <>
         {wrongCaptureAlert && (
            <Alerts
               type="error"
               message="Entered Code is incorrect"
            />
         )}
         <Notificationlevel
            note="To be our team member sign up or contact with website admin"
            link="/registeruser"
            linkText="Create Account"
         />
         <div className="userlogin_form_container">
            <Herotext text="Hi fox!" />
            <div className="userlogin_form">
               <div className="input_fild_box">
                  <label htmlFor="username">Enter Your Username</label>
                  <input
                     type="text"
                     name="username"
                     id="username"
                     autoComplete="off"
                     placeholder="Your username"
                     onChange={handleInputChange(setUsername)}
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="password">Enter Your Password</label>
                  <input
                     type="password"
                     name="password"
                     id="password"
                     autoComplete="off"
                     placeholder="Your Password"
                     onChange={handleInputChange(setPassword)}
                  />
               </div>
               <div className="capture_code">
                  <p>{captureCode}</p>
                  <button onClick={handleCaptureCode}>
                     <img src={assets.reloadicon} alt="Reload Capture Code" />
                  </button>
               </div>
               <div className="input_fild_box">
                  <label htmlFor="userEnteredCaptureCode">Enter Capture Code</label>
                  <input
                     type="text"
                     name="userEnteredCaptureCode"
                     id="userEnteredCaptureCode"
                     placeholder="Capture code"
                     autoComplete="off"
                     onChange={handleInputChange(setUserEnteredCaptureCode)}
                     value={userEnteredCaptureCode}
                  />
               </div>
               <div className="loginsubmit_btns">
                  <button onClick={handleLoginClick} className="login_form_submit_btn login">
                     Login
                  </button>
                  <button className="login_form_submit_btn cancel">
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}

// Capture Code Utility Functions

function generateCaptureCode(length = 6) {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   const result = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
   try {
      localStorage.setItem("captureCode", result);
   } catch (e) {
      console.error('Failed to store the capture code in localStorage:', e);
   }
   return result;
}

function verifyCaptureCode(inputCode) {
   let storedCode;
   try {
      storedCode = localStorage.getItem("captureCode");
      localStorage.removeItem("captureCode");
   } catch (e) {
      console.error('Failed to manage the capture code in localStorage:', e);
   }
   return inputCode === storedCode;
}

export { generateCaptureCode, verifyCaptureCode };
