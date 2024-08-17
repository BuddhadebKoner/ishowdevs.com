import React from 'react';
import '../styles/Notificationlevel.css';

export default function components({ note, link, linkText }) {

   return (
      <>
         <div className="notification_container">
            <p>{note}</p>
            <a href={link}>{linkText}</a>
         </div>
      </>

   )

}