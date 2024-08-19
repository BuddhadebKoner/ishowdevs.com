import React from 'react';
import Notificationlevel from '../components/Notificationlevel';
import Herotext from '../components/Herotext';
import '../styles/Userhome.css';

export default function components() {

   return (

      <>
         <div className="home_container">
            <Notificationlevel
               note="Hi fox ! to be our team member, you need to sign in first."
               link="/"
               linkText="Sign in" />

            <div className="home_hero_container_headline">
               <Herotext
                  text={"All you need to make money <br/> doing what you love"}
               />
               <p className='home_hero_container_subheading'>Join 1M+ creators getting donations, memberships and sales <br /> from fans!</p>
            </div>
            <div className="home_hero_container_cover">
               <div className="dropdown_container">
                  <select name="WorkAs" id="WorkAs" autoComplete="off" defaultValue="Looking for ?" className="premium-dropdown">
                     <option value="Looking for ?" disabled hidden>Looking for ?</option>
                     <option value="Web Developer">Web Developer</option>
                     <option value="Designer">Designer</option>
                     <option value="Project Manager">Project Manager</option>
                     <option value="QA Engineer">QA Engineer</option>
                  </select>
                  <button className='hero_btn_find'>Find</button>
               </div>
            </div>
         </div>

      </>
   )

}