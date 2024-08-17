import React from 'react';
import Homelayot from './layout/Homelayout';
import { UserProvider } from './context/user.context';


function App() {
  return (
    <UserProvider>
      <Homelayot />
    </UserProvider>
  );
}

export default App;
