import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Myacount/Sidebar';
import '../styles/Myacount.css';

export default function pages() {

   return (

      <>
         <div className="myacount_container">
            <div className="myacount_container_card">
               <Sidebar />
               <div className="myacount_container_outlet">
                  <Outlet />
               </div>
            </div>
         </div>
      </>

   )

}