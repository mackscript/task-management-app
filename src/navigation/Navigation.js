import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {cloneElement, useEffect} from 'react';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Settings/Setting';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import OtpVerification from '../screens/Auth/OtpVerification';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignInScreen from '../screens/Auth/SignInScreen';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import {Div, Flex, Text} from '../components/common/UI';
import {Platform, PlatformColor, TouchableOpacity, View} from 'react-native';
import HomeIcon from '../assets/icons/home.svg';
import UserIcon from '../assets/icons/user.svg';
import MailIcon from '../assets/icons/ai_mail.svg';

import {height} from '../utils/utils';
import MoreScreen from '../screens/more/MoreScreen';
import CreateTask from '../screens/task/CreateTask';
import Svg, {Path} from 'react-native-svg';
import AllTask from '../screens/task/AllTask';
import CreateCompanyName from '../screens/Auth/CreateCompanyName';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const defaultOption = {
  headerShown: false,
};
const TabView = () => {
  const {theme} = useSelector(state => state.theme);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: 'transparent', // Make the tab bar background transparent
          backgroundColor: theme.mode == 'dark' ? theme.colors.primary : '#fff',
          height: Platform.OS == 'ios' ? 100 : 70,
          // borderTopEndRadius: 15,
          // borderTopStartRadius: 15,

          // paddingBottom: 5,
          // position: 'absolute',
          // borderTopColor: '#94a3b8',
          borderTopWidth: 0, //if its 0 then hide margin top
          paddingHorizontal: 6,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: theme.mode == 'dark' ? '#fff' : '#60a5fa', // Active color
        tabBarInactiveTintColor: theme.colors.op, // /Inactive color
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{scale: focused ? 1.3 : 1}],
              }}>
              <Div
                pl={20}
                pr={20}
                pt={4}
                pb={4}
                alc
                center
                br={20}
                bg={focused ? 'transparent' : 'transparent'}>
                <Svg
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={color}
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M21 17.9668V10.1503C21 8.93937 20.4604 7.7925 19.5301 7.02652L14.5301 2.90935C13.0577 1.69688 10.9423 1.69689 9.46986 2.90935L4.46986 7.02652C3.53964 7.7925 3 8.93937 3 10.1503V17.9668C3 20.1943 4.79086 22 7 22H17C19.2091 22 21 20.1943 21 17.9668Z"
                    stroke={color}
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M10 18H14"
                    stroke={theme.colors.opb}
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </Svg>
              </Div>
              {focused && (
                <View
                  style={{
                    marginTop: 2,
                    width: 5,
                    height: 5,
                    backgroundColor:
                      theme.mode == 'dark' ? '#fff' : theme.colors.primary,
                    borderRadius: 50,
                  }}></View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AllTask"
        component={AllTask}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{scale: focused ? 1.3 : 1}],
              }}>
              <Div
                pl={20}
                pr={20}
                pt={4}
                pb={4}
                alc
                center
                br={20}
                bg={focused ? 'transparent' : 'transparent'}>
                <Svg
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M10 6H16M10 14H16M10 10H22M10 18H22M3 10H5C5.55228 10 6 9.55228 6 9V7C6 6.44772 5.55228 6 5 6H3C2.44772 6 2 6.44772 2 7V9C2 9.55228 2.44772 10 3 10ZM3 18H5C5.55228 18 6 17.5523 6 17V15C6 14.4477 5.55228 14 5 14H3C2.44772 14 2 14.4477 2 15V17C2 17.5523 2.44772 18 3 18Z"
                    stroke={color}
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </Svg>
              </Div>
              {focused && (
                <View
                  style={{
                    marginTop: 2,
                    width: 5,
                    height: 5,
                    backgroundColor:
                      theme.mode == 'dark' ? '#fff' : theme.colors.primary,
                    borderRadius: 50,
                  }}></View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreateTask"
        component={CreateTask}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{scale: focused ? 1.3 : 1.2}],
              }}>
              <Div
                center
                alc
                // style={{
                //   backgroundColor: 'red',
                //   alignItems: 'center',
                //   justifyContent: 'center',
                // }}

                pl={7}
                pr={7}
                pt={6}
                pb={6}
                width={45}
                height={45}
                br={100}
                bg={theme.mode == 'light' ? '#bae6fd' : '#525252'}>
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor:
                      theme.mode == 'light' ? theme.colors.primary : '#fff',
                    width: 37,
                    height: 37,
                    borderRadius: 50,
                  }}></View>
                <Svg
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                  width="24"
                  height="24"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M5 1V5V9M9 5H1"
                    stroke={theme.mode == 'light' ? '#fff' : '#000'}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </Div>
              {/* {focused && (
                <View
                  style={{
                    marginTop: 2,
                    width: 5,
                    height: 5,
                    backgroundColor:
                      theme.mode == 'dark' ? '#fff' : theme.colors.primary,
                    borderRadius: 50,
                  }}></View>
              )} */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{scale: focused ? 1.3 : 1}],
              }}>
              <Div
                pl={22}
                pr={22}
                pt={6}
                pb={6}
                alc
                center
                br={20}
                bg={focused ? 'transparent' : 'transparent'}>
                <Svg
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 0C0.895431 0 0 0.895431 0 2V6C0 7.10457 0.895431 8 2 8H6C7.10457 8 8 7.10457 8 6V2C8 0.895431 7.10457 0 6 0H2ZM16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 6.20914 13.7909 8 16 8ZM8 16C8 18.2091 6.20914 20 4 20C1.79086 20 0 18.2091 0 16C0 13.7909 1.79086 12 4 12C6.20914 12 8 13.7909 8 16ZM14 12C12.8954 12 12 12.8954 12 14V18C12 19.1046 12.8954 20 14 20H18C19.1046 20 20 19.1046 20 18V14C20 12.8954 19.1046 12 18 12H14Z"
                    fill={color}
                  />
                </Svg>
              </Div>
              {focused && (
                <View
                  style={{
                    marginTop: 2,
                    width: 5,
                    height: 5,
                    backgroundColor:
                      theme.mode == 'dark' ? '#fff' : theme.colors.primary,
                    borderRadius: 50,
                  }}></View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{scale: focused ? 1.3 : 1}],
              }}>
              <Div
                pl={20}
                pr={20}
                pt={6}
                pb={6}
                alc
                center
                br={20}
                bg={focused ? 'transparent' : 'transparent'}>
                <Svg
                  style={{marginLeft: 'auto', marginRight: 'auto'}}
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M15.25 7C15.25 8.79493 13.7949 10.25 12 10.25V11.75C14.6234 11.75 16.75 9.62335 16.75 7H15.25ZM12 10.25C10.2051 10.25 8.75 8.79493 8.75 7H7.25C7.25 9.62335 9.37665 11.75 12 11.75V10.25ZM8.75 7C8.75 5.20507 10.2051 3.75 12 3.75V2.25C9.37665 2.25 7.25 4.37665 7.25 7H8.75ZM12 3.75C13.7949 3.75 15.25 5.20507 15.25 7H16.75C16.75 4.37665 14.6234 2.25 12 2.25V3.75ZM18.25 17.5C18.25 18.0294 17.8014 18.7105 16.6143 19.3041C15.4722 19.8751 13.8418 20.25 12 20.25V21.75C14.0242 21.75 15.8938 21.3414 17.2852 20.6457C18.6316 19.9725 19.75 18.9036 19.75 17.5H18.25ZM12 20.25C10.1582 20.25 8.52782 19.8751 7.38566 19.3041C6.19864 18.7105 5.75 18.0294 5.75 17.5H4.25C4.25 18.9036 5.36836 19.9725 6.71484 20.6457C8.10618 21.3414 9.97582 21.75 12 21.75V20.25ZM5.75 17.5C5.75 16.9706 6.19864 16.2895 7.38566 15.6959C8.52782 15.1249 10.1582 14.75 12 14.75V13.25C9.97582 13.25 8.10618 13.6586 6.71484 14.3543C5.36836 15.0275 4.25 16.0964 4.25 17.5H5.75ZM12 14.75C13.8418 14.75 15.4722 15.1249 16.6143 15.6959C17.8014 16.2895 18.25 16.9706 18.25 17.5H19.75C19.75 16.0964 18.6316 15.0275 17.2852 14.3543C15.8938 13.6586 14.0242 13.25 12 13.25V14.75Z"
                    fill={color}
                  />
                </Svg>
              </Div>
              {focused && (
                <View
                  style={{
                    marginTop: 2,
                    width: 5,
                    height: 5,
                    backgroundColor:
                      theme.mode == 'dark' ? '#fff' : theme.colors.primary,
                    borderRadius: 50,
                  }}></View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const {isLogin} = useSelector(state => state.otp);
  const {companyDetails} = useSelector(state => state.otp);

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
      {!isLogin && (
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={defaultOption}
        />
      )}
      {!companyDetails?.companyName && (
        <Stack.Screen
          name="CreateCompanyName"
          component={CreateCompanyName}
          options={defaultOption}
        />
      )}

      <Stack.Screen
        name="TabView"
        component={TabView}
        options={defaultOption}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
