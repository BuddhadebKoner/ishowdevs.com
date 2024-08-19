import React from 'react';
import Homelayot from './layout/Homelayout';
import { UserProvider } from './context/user.context';
import { ResponceProvider } from './context/responce.context';


function App() {
  return (
    <UserProvider>
      <ResponceProvider>
        <Homelayot />
      </ResponceProvider>
    </UserProvider>
  );
}

export default App;
