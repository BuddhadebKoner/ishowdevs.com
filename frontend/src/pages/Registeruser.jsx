import React, { useState } from 'react';
import Notificationlevel from '../components/Notificationlevel';
import Herotext from '../components/Herotext';
import '../styles/Userregister.css';

export default function Pages() {

   const [mediaLinks, setMediaLinks] = useState(['']);
   const [error, setError] = useState('');

   const handleAddField = () => {
      if (mediaLinks[mediaLinks.length - 1].trim() === '') {
         setError('Please fill the previous field before adding a new one.');
         return;
      }
      setError('');
      setMediaLinks([...mediaLinks, '']);
   };

   const handleMediaLinks = (index, event) => {
      const newMediaLinks = [...mediaLinks];
      newMediaLinks[index] = event.target.value;
      setMediaLinks(newMediaLinks);
   };

   return (
      <>
         <Notificationlevel
            note="If you face any problem, please contact the admin."
            link=""
            linkText="Contact"
         />

         <div className="userregister_form_container">
            <Herotext text="Register to be our team member" />
            <div className="rgisterlogin_form">
               <div className="input_fild_box">
                  <label htmlFor="name">Full Name</label>
                  <input
                     type="text"
                     name="name"
                     id="fullname"
                     autoComplete="off"
                     placeholder="Your full name"
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Username">Username</label>
                  <input type="text"
                     name="Username"
                     id="Username"
                     autoComplete="off"
                     placeholder="Your Username"
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Email">Email</label>
                  <input type="text"
                     name="Email"
                     id="Email"
                     autoComplete="off"
                     placeholder="Your Email"
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Mobile">Mobile (optional)</label>
                  <input type="text"
                     name="Mobile"
                     id="Mobile"
                     autoComplete="off"
                     placeholder="Your mobile number"
                  />
               </div>
               <div className="input_fild_box">
                  <label>
                     Avatar
                  </label>
                  <input type="file"
                     accept="image/*" />
               </div>
               <div className="input_fild_box">
                  <label>
                     Cover Image
                  </label>
                  <input type="file"
                     accept="image/*" />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="portfolio">Portfolio</label>
                  <input type="text"
                     name="portfolio"
                     id="portfolio"
                     autoComplete="off"
                     placeholder="Your portfolio link"
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="WorkAs">Work As</label>
                  <select
                     name="WorkAs"
                     id="WorkAs"
                     autoComplete="off"
                     className="dropdown_style"
                  >
                     <option value="WebDeveloper" disabled selected hidden>Select your role</option>
                     <option value="WebDeveloper">Web Developer</option>
                     <option value="Designer">Designer</option>
                     <option value="ProjectManager">Project Manager</option>
                     <option value="QAEngineer">QA Engineer</option>
                  </select>
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Bio">Bio (optional)</label>
                  <input type="text"
                     name="portfolio"
                     id="portfolio"
                     autoComplete="off"
                     placeholder="About you"
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Medialinks">Media (optional)</label>
                  {mediaLinks.map((link, index) => (
                     <input
                        key={index}
                        type="text"
                        name={`Medialinks_${index}`}
                        id={`Medialinks_${index}`}
                        autoComplete="off"
                        placeholder="Web link"
                        value={link}
                        onChange={(e) => handleMediaLinks(index, e)}
                     />
                  ))}
                  <button type="button" onClick={handleAddField}>Add</button>
                  {error && <p className="error">{error}</p>} {/* Display error message */}
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Keywords">Keywords</label>
                  <input type="text"
                     name="Keywords"
                     id="Keywords"
                     autoComplete="off"
                     placeholder="Write your skills using comma"
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="EnterPassword">Enter Password</label>
                  <input type="text"
                     name="EnterPassword"
                     id="EnterPassword"
                     autoComplete="off"
                     placeholder="Enter strong password"
                  />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Reenterpassword">Confrom Password</label>
                  <input type="text"
                     name="Reenterpassword"
                     id="Reenterpassword"
                     autoComplete="off"
                     placeholder="Enter confrom password"
                  />
               </div>
               <div className="loginsubmit_btns">
                  <button className="login_form_submit_btn">Register</button>
                  <button className="login_form_submit_btn cancel">Cancel</button>
               </div>
            </div>
         </div>
      </>
   );
}
