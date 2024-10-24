import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Settings/Setting';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignInScreen from '../screens/Auth/SignInScreen';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

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
  const {isLogin} = useSelector(state => state.auth);

  return (
    <Stack.Navigator>
      {!isLogin && (
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={defaultOption}
        />
      )}
      {!isLogin && (
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={defaultOption}
        />
      )}
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
