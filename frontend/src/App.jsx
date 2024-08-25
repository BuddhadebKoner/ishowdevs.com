import React from 'react';
import Homelayot from './layout/Homelayout';
import { UserProvider } from './context/user.context';
import { PublicProvider } from './context/public.context';
import './App.css';



function App() {
  return (
    <PublicProvider>
      <UserProvider>
          <Homelayot />
      </UserProvider>
    </PublicProvider>
  );
}

export default App;
