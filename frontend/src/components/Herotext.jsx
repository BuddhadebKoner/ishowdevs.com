import React from 'react';
import '../styles/Herotext.css';

export default function Herotext({ text }) {
   const splitText = text.split("<br/>");

   return (
      <>
         <div className="hero_text_container">
            <h1 className="text_gradient">
               {splitText.map((line, index) => (
                  <React.Fragment key={index}>
                     {line}
                     {index !== splitText.length - 1 && <br />}
                  </React.Fragment>
               ))}
            </h1>
         </div>
      </>
   );
}