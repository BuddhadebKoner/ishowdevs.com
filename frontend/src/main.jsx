import React from 'react';
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
import Passwordchnage from './pages/myacount/Passwordchange.jsx';
import Myprofile from './pages/myacount/Myprofile.jsx';
import Myposts from './pages/myacount/Myposts.jsx';
import Paymentdetails from './pages/myacount/Paymentdetails.jsx';
import Forgotpassword from './pages/Forgotpassword.jsx';
import Addpost from './pages/myacount/Addpost.jsx';
import Publicpost from './pages/Publicpost.jsx';

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

        {/* User authentication routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Registeruser />} />
        <Route path='forgot-password' element={<Forgotpassword />} />

        {/* User profile routes */}
        <Route path='account/:userID' element={<Myacount />}>
          <Route index element={<Myprofile />} />
          <Route path='posts' element={<Myposts />} />
          <Route path='add-post' element={<Addpost />} />
          <Route path='payment-details' element={<Paymentdetails />} />
          <Route path='change-password' element={<Passwordchnage />} />
        </Route>

        {/* Public profile and post routes */}
        <Route path='public/:username' element={<Publicacount />} />
        <Route path='post/:postid' element={<Publicpost />} />

        {/* Content routes */}
        <Route path='explore' element={<Explore />} />
        <Route path='blogpost' element={<Blogpost />} />
        <Route path='about' element={<About />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

createRoot(document.getElementById('root')).render(<Main />);
