import React from 'react';
import '../styles/Herotext.css';

export default function components({ text }) {

   return (

      <>
         <div className="hero_text_container">
            <h1 className="text_gradient">{text}</h1>
         </div>
      </>

   )

}