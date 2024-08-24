import React, { useContext, useMemo } from 'react';
import '../styles/Navbar.css';
// import { UserContext } from '../context/user.context';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

export default function components() {
   // const { userdetails } = useContext(UserContext);



   const userdetails = {
      "_id": {
         "$oid": "66c640294ce2289ee4e7b895"
      },
      "username": "ishowspeed",
      "fullName": "iShow Speed",
      "email": "ishowspeed@gmail.com",
      "password": "$2b$10$kKIWFSiq3mnxU2Xj/r9zK.wR8nn64sjZ2F6IsOX4Kl6sYb7yW2QLy",
      "avatar": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724268582/cieg5qs9ryg7arxbioym.webp",
      "coverImage": "http://res.cloudinary.com/dsfztnp9x/image/upload/v1724268584/ecfvepmfm6gzl8loc9nu.jpg",
      "isVarified": true,
      "portfolio": "https://buddhadebkoner.vercel.app/",
      "mobile": "+91 8900280349",
      "workAs": "Web Developer",
      "role": "team",
      "bio": "A dedicated programmer with a strong foundation in software development. Excels at translating client needs into elegant, functional code. Always eager to take on new challenges and learn new technologies.",
      "mediaLinks": [
         "https://www.linkedin.com/in/buddhadeb-koner-8501b3231/",
         "https://twitter.com/buddhadeb_koner"
      ],
      "keyWords": "App dev,web dev",
      "isActive": true,
      "profileRich": 0,
      "happyCustomer": 0,
      "createdAt": {
         "$date": "2024-08-21T19:29:45.177Z"
      },
      "updatedAt": {
         "$date": "2024-08-23T11:07:54.074Z"
      },
      "__v": 1,
      "Userpost": []
   }
   const isLoggedIn = true;

   const userData = useMemo(() => ({
      ...userdetails
   }), [userdetails]);

   return (

      <>
         <nav className="navbar_container">
            <div className="left_navbar_container">
               <NavLink to={""} className="navbar_logo">
                  <span className="logo_normal_text">CODE</span>
                  <span className="text_gradient">BRIDGE</span>
               </NavLink>
               <div className="input_field_container">
                  <select
                     name="WorkAs"
                     id="WorkAs"
                     autoComplete="off"
                     className="dark_mode_dropdown"
                     required
                     defaultValue="Web Developer"
                  >
                     <option value="Web Developer" disabled hidden>
                        Web Developer
                     </option>
                     <option value="Web Developer">Web Developer</option>
                     <option value="Designer">Designer</option>
                     <option value="Project Manager">Project Manager</option>
                     <option value="QA Engineer">QA Engineer</option>
                  </select>
                  <button>
                     <img src={assets.searchIocn} alt="" />
                  </button>
               </div>
            </div>
            <div className="right_navbar_container">
               <NavLink to={"/explore"} className="navbar_link">
                  Explore
               </NavLink>
               <NavLink to={"/about"} className="navbar_link">
                  About
               </NavLink>
               <NavLink to={"/blogpost"} className="navbar_link">
                  Blog
               </NavLink>
               <button className="navbar_link">
                  {
                     userData.avatar && isLoggedIn ? (
                        <NavLink to={"/myacount"}>
                           <img src={userData.avatar} alt="" className='navbar_profile' />
                        </NavLink>
                     ) : (
                        <NavLink to={"/login"}>
                           <img src={assets.profile} alt="" className='navbar_profile' />
                        </NavLink>
                     )
                  }
               </button>
            </div>
         </nav>

      </>

   )

}