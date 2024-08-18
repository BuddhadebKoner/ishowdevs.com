import React from 'react';
import '../styles/Notificationlevel.css';
import { Link } from 'react-router-dom';

export default function components({ note, link, linkText }) {

   return (
      <>
         <div className="notification_container">
            <p>{note}</p>
            <Link to={link}>{linkText}</Link>
         </div>
      </>

   )

}