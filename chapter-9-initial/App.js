import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Posts from './screens/Posts';
import PostDetail from './screens/PostDetail';
import Profile from './screens/Profile';
import Login from './screens/Login';
import PostForm from './screens/PostForm';
import AppContext from './context/AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <StatusBar style='auto' />
        <Stack.Navigator initialRouteName='Posts'>
          <Stack.Screen name='Posts' component={Posts} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PostForm" component={PostForm} />
          <Stack.Screen name='PostDetail' component={PostDetail} />
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
}
