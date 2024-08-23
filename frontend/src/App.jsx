import React from 'react';
import Homelayot from './layout/Homelayout';
import { UserProvider } from './context/user.context';
import { PublicProvider } from './context/public.context';
import { PostProvider } from './context/post.context';



function App() {
  return (
    <PublicProvider>
      <UserProvider>
        <PostProvider>
          <Homelayot />
        </PostProvider>
      </UserProvider>
    </PublicProvider>
  );
}

export default App;
