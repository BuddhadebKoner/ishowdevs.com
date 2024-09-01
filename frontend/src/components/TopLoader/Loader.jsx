import React, { useContext } from 'react';
import { PublicContext } from '../../context/public.context';

export default function TopLoader() {
   const { loading } = useContext(PublicContext);


   return (

      <>
         {
            loading ? (
               <div className="load-bar">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
               </div>
            ) : (
               null
            )
         }

      </>

   )

}