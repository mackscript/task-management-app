import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Settings/Setting';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignInScreen from '../screens/Auth/SignInScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const defaultOption = {
  headerShown: false,
};
const TabView = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={defaultOption} />
      <Tab.Screen name="Profile" component={Profile} options={defaultOption} />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={defaultOption}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={defaultOption}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={defaultOption}
      />
      <Stack.Screen
        name="TabView"
        component={TabView}
        options={defaultOption}
      />
      {/* <Stack.Screen
        name="AuthWithCamera"
        component={AuthWithCamera}
        options={defaultOption}
      /> */}
    </Stack.Navigator>
  );
};

export default Navigation;
