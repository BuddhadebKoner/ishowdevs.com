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
      setKeywords, } = useContext(UserContext);

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
               <input
                  type="text"
                  className="form_control"
                  id="tags"
                  placeholder="Enter Tags (comma separated)"
                  onChange={(e) => setTags(e.target.value)}
               />
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
                  onChange={(e) => setKeywords(e.target.value)}
               />
            </div>
            <button type="submit" className="btn" onClick={ handelCreatePost } >Submit Post</button>
         </div>
      </>
   )
}
