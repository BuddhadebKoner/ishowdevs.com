import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../context/user.context';

export default function Myacount({ userid }) {
   const { handelGetpost, userPosts, handelDeletePost } = useContext(UserContext);
   const [currentPage, setCurrentPage] = useState(1);
   const postsPerPage = 5; 

   // Memoize the currentPosts to only recompute when userPosts or currentPage changes
   const currentPosts = useMemo(() => {
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      return userPosts.slice(indexOfFirstPost, indexOfLastPost);
   }, [userPosts, currentPage]);

   // Memoize totalPages to avoid unnecessary calculations
   const totalPages = useMemo(() => Math.ceil(userPosts.length / postsPerPage), [userPosts]);

   useEffect(() => {
      if (userid) {
         handelGetpost(userid);
      }
   }, [userid]);

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(prevPage => prevPage + 1);
      }
   };

   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(prevPage => prevPage - 1);
      }
   };

   const DeletePost = (postid) => {
      console.log('Delete post with ID:', postid);
      handelDeletePost(postid);
   };

   return (
      <div className="myaccount-container">
         {currentPosts && currentPosts.length > 0 ? (
            <ul className="post-list">
               {currentPosts.map(post => (
                  <li key={post._id} className="post-item">
                     <img src={post.image} alt={post.title} className="post-image" />
                     <div className="post-content">
                        <div className="post-title-delete-container">
                           <h2 className="post-title">{post.title}</h2>
                           <button onClick={() => { DeletePost(post._id) }}>Delete</button>
                        </div>
                        <p className="post-description">{post.content}</p>
                        {post.projectLink && (
                           <a href={post.projectLink} target="_blank" rel="noopener noreferrer" className="post-link">
                              View Project
                           </a>
                        )}
                        <p className="post-tags">Tags: {post.tags}</p>
                     </div>
                  </li>
               ))}
            </ul>
         ) : (
            <p>No posts available.</p>
         )}

         {/* Pagination Controls */}
         <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
               Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
               Next
            </button>
         </div>
      </div>
   );
}
