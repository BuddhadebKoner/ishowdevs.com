import React, { useContext } from 'react';
import { PublicContext } from '../context/public.context';

export default function components() {
   // public context
   const { watchingProfile } = useContext(PublicContext);

   return (

      <>
         <h1>
            {watchingProfile && watchingProfile.fullName}
         </h1>
      </>

   )

}