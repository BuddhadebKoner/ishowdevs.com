import React, { useContext, useMemo } from 'react';
import '../styles/Navbar.css';
import { UserContext } from '../context/user.context';
import { NavLink } from 'react-router-dom';

export default function components({ isLoggedIn }) {
   const { userdetails } = useContext(UserContext);

   const userData = useMemo(() => ({
      ...userdetails
   }), [userdetails]);

   return (

      <>
         <nav className="navbar_container">
            <div className="navbar_logo">
               <NavLink to={"/"} className='navbar_links_btns'>
                  <h1>Logo</h1>
               </NavLink>
            </div>
            <div className="navbar_links">
               <NavLink to={"explore"} className='navbar_links_btns'>Explore</NavLink>
               <NavLink to={"about"} className='navbar_links_btns'>About</NavLink>
               <NavLink to={"blogpost"} className='navbar_links_btns'>Blog</NavLink>
               {isLoggedIn === true ?
                  <div className="my_profile">
                     <button className='hero_btn'>Contribute</button>
                     <NavLink to={"myacount"} >
                        <img src={userData.avatar} alt="" className='my_profile_iamge' />
                     </NavLink>
                  </div>
                  :
                  <div className="login_signup">
                     <NavLink to={"login"} className='hero_btn'>Devaloper</NavLink>
                  </div>
               }
            </div>
         </nav>
      </>

   )

}