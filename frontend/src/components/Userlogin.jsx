import React, { useState, useEffect } from 'react';
import Herotext from './Herotext';
import '../styles/Userlogin.css';
import { assets } from '../assets/assets';

export default function UserLogin() {
   const [captureCode, setCaptureCode] = useState('');
   const [userEnteredCaptureCode, setUserEnteredCaptureCode] = useState('');

   // Generate and set capture code when component mounts
   useEffect(() => {
      const initialCaptureCode = generateCaptureCode();
      setCaptureCode(initialCaptureCode);
   }, []);

   const handleCaptureCode = () => {
      const newCaptureCode = generateCaptureCode();
      setCaptureCode(newCaptureCode);
   };

   const handleLogin = () => {
      try {
         const isValid = verifyCaptureCode(userEnteredCaptureCode);
         if (isValid) {
            console.log('Login successful!');
         } else {
            setCaptureCode(generateCaptureCode());
            setUserEnteredCaptureCode('');
         }
      } catch (error) {
         console.error('Error during login:', error);
      }
   };


   return (
      <div className="userlogin_form_container">
         <Herotext text="Hi fox!" />
         <div className="userlogin_form">
            <div className="input_fild_box">
               <label htmlFor="username">Enter Your Username / Email</label>
               <input type="text" name="username" id="username" placeholder="Enter your username or email" />
            </div>
            <div className="input_fild_box">
               <label htmlFor="password">Enter Your Password</label>
               <input type="password" name="password" id="password" placeholder="Enter your Password" />
            </div>
            <div className="capture_code">
               <input type="text" value={captureCode} readOnly />
               <button onClick={handleCaptureCode}>
                  <img src={assets.reloadicon} alt="Reload Capture Code" />
               </button>
            </div>
            <div className="input_fild_box">
               <label htmlFor="capture">Enter Capture Code</label>
               <input
                  type="text"
                  name="capture"
                  id="capture"
                  placeholder="Enter capture code"
                  onChange={(e) => setUserEnteredCaptureCode(e.target.value)}
               />
            </div>
            <div className="loginsubmit_btns">
               <button onClick={handleLogin}>Login</button>
               <button>Cancel</button>
            </div>
         </div>
      </div>
   );
}

// Capture Code Utility Functions

function generateCaptureCode(length = 6) {
   if (typeof length !== 'number' || length <= 0) {
      throw new Error('Invalid length. Length must be a positive number.');
   }

   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let result = '';
   const charactersLength = characters.length;

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters[randomIndex];
   }

   try {
      localStorage.setItem("captureCode", result);
   } catch (e) {
      console.error('Failed to store the capture code in localStorage:', e);
      throw new Error('Unable to store the capture code.');
   }

   return result;
}

function verifyCaptureCode(inputCode) {
   if (typeof inputCode !== 'string') {
      throw new Error('Invalid input. Input code must be a string.');
   }

   let storedCode;
   try {
      storedCode = localStorage.getItem("captureCode");
   } catch (e) {
      console.error('Failed to retrieve the capture code from localStorage:', e);
      throw new Error('Unable to retrieve the capture code.');
   }

   const isValid = inputCode === storedCode;

   try {
      localStorage.removeItem("captureCode");
   } catch (e) {
      console.error('Failed to remove the capture code from localStorage:', e);
   }

   return isValid;
}

export { generateCaptureCode, verifyCaptureCode };
