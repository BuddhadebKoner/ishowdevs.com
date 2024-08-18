import React, { useContext } from 'react';
import Alerts from '../components/Alarts/Useralart';
import { UserContext } from '../context/user.context'

export default function pages() {
   const { isLoggedIn } = useContext(UserContext);

   return (

      <>
         {isLoggedIn && (
            <Alerts
               type="offer"
               AlertHeadtext="Welcome Back"
               message="Don't miss out! A special limited-time offer just for you: 20% off everything. Grab your favorites before it's too late!"
            />
         )}
      </>

   )

}