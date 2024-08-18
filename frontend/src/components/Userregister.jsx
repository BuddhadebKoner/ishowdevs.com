import React, { useContext, useState } from 'react';
import Notificationlevel from '../components/Notificationlevel';
import Herotext from '../components/Herotext';
import '../styles/Userregister.css';
import { UserContext } from '../context/user.context';

export default function UserRegister() {
   const { handelRegister } = useContext(UserContext);
   const [mediaLinks, setMediaLinks] = useState(['']);
   const [error, setError] = useState('');


   const handleAddField = () => {
      const lastField = mediaLinks[mediaLinks.length - 1]?.trim();

      if (!lastField) {
         setError('Please fill the previous field before adding a new one.');
         return;
      }

      setError('');
      setMediaLinks([...mediaLinks, '']);
   };

   const handleDeleteField = () => {
      if (mediaLinks.length > 1) {
         setMediaLinks(['']);
         setError('');
      } else {
         setError('There are no additional fields to clear.');
      }
   };

   const handleMediaLinksChange = (index, event) => {
      const newMediaLinks = [...mediaLinks];
      newMediaLinks[index] = event.target.value;
      setMediaLinks(newMediaLinks);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();

      const fullName = event.target.fullname.value;
      const username = event.target.Username.value;
      const email = event.target.Email.value;
      const password = event.target.EnterPassword.value;
      const portfolio = event.target.portfolio.value;
      const mobile = event.target.Mobile.value;
      const workAs = event.target.WorkAs.value;
      const bio = event.target.Bio.value;
      const avatarFile = event.target.avatar.files[0];
      const coverImageFile = event.target.coverImage.files[0];

      formData.append('fullName', fullName);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('portfolio', portfolio);
      formData.append('mobile', mobile);
      formData.append('workAs', workAs);
      formData.append('bio', bio);
      formData.append('mediaLinks', JSON.stringify(mediaLinks));
      formData.append('keyWords', '');
      formData.append('avatar', avatarFile);
      formData.append('coverImage', coverImageFile);

      // Print FormData contents
      for (let [key, value] of formData.entries()) {
         console.log(key, value);
      }

      try {
         const response = await handelRegister(formData);
         console.log("Registration response:", response);
      } catch (error) {
         console.error("Registration error:", error);
      }
   };



   return (
      <>
         <Notificationlevel note="If you face any problem, please contact the admin." link="" linkText="Contact" />
         <div className="userregister_form_container">
            <Herotext text="Register to be our team member" />
            <form className="rgisterlogin_form" onSubmit={handleSubmit}>
               <div className="input_fild_box">
                  <label htmlFor="fullname">Full Name *</label>
                  <input type="text" name="fullname" id="fullname" autoComplete="off" placeholder="Your full name" required />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Username">Username *</label>
                  <input type="text" name="Username" id="Username" autoComplete="off" placeholder="Your Username" required />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Email">Email *</label>
                  <input type="email" name="Email" id="Email" autoComplete="off" placeholder="Your Email" required />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Mobile">Mobile (optional)</label>
                  <input type="text" name="Mobile" id="Mobile" autoComplete="off" placeholder="Your mobile number" />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="avatar">Avatar *</label>
                  <input type="file" name="avatar" id="avatar" accept="image/*" required />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="coverImage">Cover Image *</label>
                  <input type="file" name="coverImage" id="coverImage" accept="image/*" required />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="portfolio">Portfolio *</label>
                  <input type="text" name="portfolio" id="portfolio" autoComplete="off" placeholder="Your portfolio link" required />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="WorkAs">Work As</label>
                  <select name="WorkAs" id="WorkAs" autoComplete="off" className="dropdown_style" required defaultValue="Web Developer">
                     <option value="Web Developer" disabled hidden>Web Developer</option>
                     <option value="Web Developer">Web Developer</option>
                     <option value="Designer">Designer</option>
                     <option value="Project Manager">Project Manager</option>
                     <option value="QA Engineer">QA Engineer</option>
                  </select>
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Bio">Bio (optional)</label>
                  <input type="text" name="Bio" id="Bio" autoComplete="off" placeholder="About you" />
               </div>
               <div className="input_fild_box input_fild_media_link">
                  <label htmlFor="Medialinks">Media (optional)</label>
                  {mediaLinks.map((link, index) => (
                     <input key={index} type="text" name={`Medialinks_${index}`} id={`Medialinks_${index}`} autoComplete="off" placeholder="Enter Valid Link" value={link} onChange={(e) => handleMediaLinksChange(index, e)} />
                  ))}
                  <div className="media_link_add_delete_btns">
                     <button type="button" onClick={handleAddField} className='media_link_add_btn'>Add</button>
                     <button type="button" onClick={handleDeleteField} className='media_link_delete_btn'>Clear</button>
                  </div>
                  {error && <p className="error">{error}</p>}
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Keywords">Keywords</label>
                  <input type="text" name="Keywords" id="Keywords" autoComplete="off" placeholder="Write your skills using comma" />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="EnterPassword">Enter Password *</label>
                  <input type="password" name="EnterPassword" id="EnterPassword" autoComplete="off" placeholder="Enter strong password" required />
               </div>
               <div className="input_fild_box">
                  <label htmlFor="Reenterpassword">Confirm Password *</label>
                  <input type="password" name="Reenterpassword" id="Reenterpassword" autoComplete="off" placeholder="Enter confirm password" required />
               </div>
               <div className="loginsubmit_btns">
                  <button type="submit" className="login_form_submit_btn">Register</button>
                  <button type="button" className="login_form_submit_btn cancel">Cancel</button>
               </div>
            </form>
         </div>
      </>
   );
}
