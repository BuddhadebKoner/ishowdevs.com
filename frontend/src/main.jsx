import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Myacount from './pages/Myacount.jsx';
import Publicacount from './pages/Publicacount.jsx';
import Registeruser from './pages/Registeruser.jsx';
import Explore from './pages/Explore.jsx';
import Blogpost from './pages/Blogpost.jsx';
import About from './pages/About.jsx';

const Main = () => {

  // useEffect(() => {
  //   if (performance.getEntriesByType("navigation")[0].type === "reload") {
  //     const lastVisitedPath = localStorage.getItem('lastVisitedPath');
  //     if (!lastVisitedPath || lastVisitedPath === '/') {
  //       window.location.href = './';
  //     }
  //   }

  //   localStorage.setItem('lastVisitedPath', window.location.pathname);
  // }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='myacount' element={<Myacount />} />
        <Route path='publicacount' element={<Publicacount />} />
        <Route path='registeruser' element={<Registeruser />} />
        <Route path='explore' element={<Explore />} />
        <Route path='blogpost' element={<Blogpost />} />
        <Route path='about' element={<About />} />
      </Route>
    )
  );

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Main />);
