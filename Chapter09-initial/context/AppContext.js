import React from 'react';
import { PostsContextProvider } from './PostsContext';
import { UserContextProvider } from './UserContext';

const AppContext = ({ children }) => {
  return (
    <UserContextProvider>
      <PostsContextProvider>{children}</PostsContextProvider>
    </UserContextProvider>
  );
};

export default AppContext;
