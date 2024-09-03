import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/user.context';

export default function MyAccount({ fullName, mobile, portfolio, workAs, keyWords, mediaLinks }) {

   // Context API access
   const { handelProfileUpdate } = useContext(UserContext);

   // Initialize state with props
   const [name, setName] = useState(fullName || '');
   const [phone, setPhone] = useState(mobile || '');
   const [site, setSite] = useState(portfolio || '');
   const [job, setJob] = useState(workAs || '');
   const [keywords, setKeywords] = useState(keyWords || '');
   const [links, setLinks] = useState(mediaLinks || '');
   const [isEditing, setIsEditing] = useState(false);
   const [initialValues, setInitialValues] = useState({ name, phone, site, job, keywords, links });

   // Update initial values when props change
   useEffect(() => {
      setInitialValues({
         name: fullName || '',
         phone: mobile || '',
         site: portfolio || '',
         job: workAs || '',
         keywords: keyWords || '',
         links: mediaLinks || ''
      });
   }, [fullName, mobile, portfolio, workAs, keyWords, mediaLinks]);

   // Check if there are any changes
   const hasChanges =
      name.trim() !== initialValues.name.trim() ||
      phone.trim() !== initialValues.phone.trim() ||
      site.trim() !== initialValues.site.trim() ||
      job.trim() !== initialValues.job.trim() ||
      keywords.trim() !== initialValues.keywords.trim() ||
      links.trim() !== initialValues.links.trim();

   const handleEdit = () => {
      setIsEditing(true);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setIsEditing(false);

      const updatedData = {
         fullName: name,
         mobile: phone,
         portfolio: site,
         workAs: job,
         keyWords: keywords,
         mediaLinks: links
      };

      // Simulate form submission
      handelProfileUpdate(updatedData);
   };

   return (
      <>
         <form className="my_profile_form_container" onSubmit={handleSubmit}>
            <div className="edit_btn_container">
               <button type="button" onClick={handleEdit} className="my_profile_edit_btn">
                  Edit
               </button>
               <button type="submit" className="my_profile_submit_btn" disabled={!isEditing || !hasChanges}>
                  Submit
               </button>
            </div>
            <div className="my_profile_form_group">
               <label htmlFor="full_name">Full Name</label>
               <input
                  type="text"
                  className="my_profile_form_control"
                  id="full_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  disabled={!isEditing}
               />
            </div>
            <div className="my_profile_form_group">
               <label htmlFor="mobile">Mobile</label>
               <input
                  type="text"
                  className="my_profile_form_control"
                  id="mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your mobile number"
                  disabled={!isEditing}
               />
            </div>
            <div className="my_profile_form_group">
               <label htmlFor="portfolio">Portfolio</label>
               <input
                  type="text"
                  className="my_profile_form_control"
                  id="portfolio"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  placeholder="Enter your portfolio URL"
                  disabled={!isEditing}
               />
            </div>
            <div className="my_profile_form_group">
               <label htmlFor="work_as">Work As</label>
               {isEditing ? (
                  <select
                     className="my_profile_form_control"
                     id="work_as"
                     value={job}
                     onChange={(e) => setJob(e.target.value)}
                     disabled={!isEditing}
                  >
                     <option value="">Select your job title</option>
                     <option value="Web Developer">Web Developer</option>
                     <option value="Designer">Designer</option>
                     <option value="App Devaloper">App Devaloper</option>
                     <option value="Artificial Intelligence">Artificial Intelligence</option>
                     <option value="metarial">metarial</option>
                  </select>
               ) : (
                  <input
                     type="text"
                     className="my_profile_form_control"
                     id="work_as"
                     value={job}
                     readOnly
                     placeholder='Select your job title'
                  />
               )}
            </div>
            <div className="my_profile_form_group">
               <label htmlFor="key_words">Key Words</label>
               <input
                  type="text"
                  className="my_profile_form_control"
                  id="key_words"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Enter relevant key words"
                  disabled={!isEditing}
               />
            </div>
            <div className="my_profile_form_group">
               <label htmlFor="media_links">Media Links</label>
               <input
                  type="text"
                  className="my_profile_form_control"
                  id="media_links"
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  placeholder="Enter media links"
                  disabled={!isEditing}
               />
            </div>
         </form>
      </>
   );
}
