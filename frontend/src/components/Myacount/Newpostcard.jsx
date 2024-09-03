import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/user.context';

export default function UserPostForm() {
   // user context
   const {
      handelCreatePost,
      setTitle,
      setContent,
      setProjectLink,
      setTags,
      setImage,
      setKeyWords, } = useContext(UserContext);

   return (
      <>
         <div className="post_form_container" >
            <div className="form_group">
               <label htmlFor="title">Title*</label>
               <input
                  type="text"
                  className="form_control"
                  id="title"
                  placeholder="Enter Post Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
               />
            </div>
            <div className="form_group">
               <label htmlFor="content">Content*</label>
               <textarea
                  className="form_control"
                  id="content"
                  placeholder="Enter Post Content"
                  onChange={(e) => setContent(e.target.value)}
                  required
               />
            </div>
            <div className="form_group">
               <label htmlFor="projectLink">Project Link*</label>
               <input
                  type="url"
                  className="form_control"
                  id="projectLink"
                  placeholder="Enter Project URL"
                  onChange={(e) => setProjectLink(e.target.value)}
               />
            </div>
            <div className="form_group">
               <label htmlFor="tags">Tags*</label>
               {/* <input
                  type="text"
                 
                  
                  placeholder="Enter Tags (comma separated)"
                  onChange={(e) => setTags(e.target.value)}
               /> */}
               <select
                  className="form_control"
                  id="tags"
                  onChange={(e) => setTags(e.target.value)}
               >
                  <option value="">Select your catagory</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="App Devaloper">App Devaloper</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="metarial">metarial</option>
               </select>
            </div>
            <div className="form_group">
               <label htmlFor="image">Image*</label>
               <input
                  type="file"
                  className="form_control"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
               />
            </div>
            <div className="form_group">
               <label htmlFor="keywords">Keywords*</label>
               <input
                  type="text"
                  className="form_control"
                  id="keywords"
                  placeholder="Enter Keywords"
                  onChange={(e) => setKeyWords(e.target.value)}
               />
            </div>
            <button type="submit" className="btn" onClick={handelCreatePost} >Submit Post</button>
         </div>
      </>
   )
}
