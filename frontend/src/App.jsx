import React from 'react';
import Homelayot from './layout/Homelayout';
import { UserProvider } from './context/user.context';
import { PublicProvider } from './context/public.context';



function App() {
  return (
    <UserProvider>
      <PublicProvider>
        <Homelayot />
      </PublicProvider>
    </UserProvider>
  );
}

export default App;
