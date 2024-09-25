import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import { PublicContext } from '../../context/public.context';

export default function Myacount({ userid }) {
   const navigate = useNavigate();
   const { setPublicPost } = useContext(PublicContext);
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

   const publicPostClicked = (post) => {
      setPublicPost(post);
      navigate(`/post/${post._id}`, { state: { post } });
   };

   return (
      <div className="myaccount-container">
         {currentPosts && currentPosts.length > 0 ? (
            <>
               <p>Previous posts</p>
               <ul className="post-list">
                  {currentPosts.map(post => (
                     <li key={post._id} className="post-item" >
                        <img src={post.image} alt={post.title} className="post-image" onClick={() => publicPostClicked(post)} />
                        <div className="post-content">
                           <div className="post-title-delete-container">
                              <h2 className="post-title">{post.title}</h2>
                              <button onClick={() => { DeletePost(post._id) }}>Delete</button>
                           </div>
                           <p className="post-description">
                              {post.content.split(" ").length > 15
                                 ? `${post.content.split(" ").slice(0, 15).join(" ")} ....`
                                 : post.content}
                           </p>
                           {post.projectLink && (
                              <a href={post.projectLink} target="_blank" rel="noopener noreferrer" className="post-link">
                                 View Project
                              </a>
                           )}
                           <p className="post-tags">Tags: {post.keyWords}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </>

         ) : (
            <p>No posts available.</p>
         )}
         {
            currentPosts && currentPosts.length <= 5 ? (
               null
            ) : (
               <div className="pagination-controls">
                  <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                     Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                     Next
                  </button>
               </div>
            )
         }

      </div>
   );
}
