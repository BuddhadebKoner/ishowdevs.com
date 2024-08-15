import React from 'react';
import '../styles/Notificationlevel.css';

export default function components({ note, link }) {

   return (
      <>
         <div className="notification_container">
            <p>{note}</p>
            <a href={link}>Check Details</a>
         </div>
      </>

   )

}