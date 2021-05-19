import { StatusBar } from 'expo-status-bar';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Posts from './screens/Posts';
import PostDetail from './screens/PostDetail';
import Profile from './screens/Profile';
import PostForm from './screens/PostForm';
import Login from './screens/Login';

import AppContext from './context/AppContext';
import UserContext from './context/UserContext';
import { navigationRef } from './routing';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <ActionSheetProvider>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName =
              (route.name === 'Posts' &&
                (Platform.OS === 'ios' ? 'feed' : 'rss-feed')) ||
              (route.name === 'PostForm' &&
                (Platform.OS === 'ios' ? 'plus-square' : 'add-box')) ||
              (route.name === 'Profile' &&
                (Platform.OS === 'ios' ? 'user' : 'person'));

            return Platform.OS === 'ios' ? (
              <FontAwesome name={iconName} size={size} color={color} />
            ) : (
              <MaterialIcons name={iconName} size={size} color={color} />
            );
          },
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
    </ActionSheetProvider>
  );
}

function Navigator() {
  const { user, getToken } = useContext(UserContext);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style='auto' />
      <Stack.Navigator initialRouteName={user.token.length ? 'Home' : 'Login'}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={({ route }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
          })}
        />
        <Stack.Screen name='PostDetail' component={PostDetail} />
        <Stack.Screen name='Login' component={Login} />
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
