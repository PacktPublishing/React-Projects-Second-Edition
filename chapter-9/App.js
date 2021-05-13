import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Posts from './screens/Posts';
import PostDetail from './screens/PostDetail';
import Profile from './screens/Profile';
import PostForm from './screens/PostForm';
import Login from './screens/Login';

import AppContext from './context/AppContext';
import UserContext from './context/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <FontAwesome
            name={
              (route.name === 'Posts' && 'feed') ||
              (route.name === 'PostForm' && 'plus-square') ||
              (route.name === 'Profile' && 'user')
            }
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Stack.Screen name='Posts' component={Posts} />
      <Stack.Screen
        name='PostForm'
        component={PostForm}
        options={{
          tabBarLabel: 'Add post',
        }}
      />
      <Stack.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}

function Navigator() {
  const { user, getToken } = useContext(UserContext);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator>
        {user.token ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={({ route }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route),
              })}
            />
            <Stack.Screen name='PostDetail' component={PostDetail} />
          </>
        ) : (
          <Stack.Screen name='Login' component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppContext>
      <Navigator />
    </AppContext>
  );
}
