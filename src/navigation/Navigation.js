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
import Task from '../screens/task/Task';
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
          height: 80,
          paddingTop: 15,
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
                {/* <Svg
                  fill={'green'}
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    // d="M10.2796 2.71579C10.097 2.66261 9.90296 2.66261 9.72034 2.71579C9.66778 2.7311 9.57542 2.7694 9.37892 2.91817C9.17227 3.07463 8.91928 3.29855 8.52507 3.64896L3.28544 8.3064C2.64309 8.87739 2.46099 9.04955 2.33439 9.23998C2.21261 9.42317 2.12189 9.6252 2.06588 9.83793C2.00765 10.0591 1.99995 10.3095 1.99995 11.169V16.17C1.99995 17.041 2.00076 17.6331 2.03874 18.0905C2.07573 18.536 2.14275 18.7634 2.22513 18.9219C2.41488 19.2872 2.71272 19.5851 3.07801 19.7748C3.23658 19.8572 3.46397 19.9242 3.90941 19.9612C4.36681 19.9992 4.95893 20 5.82995 20H5.99995V17C5.99995 14.7909 7.79081 13 9.99995 13C12.2091 13 14 14.7909 14 17V20H14.17C15.041 20 15.6331 19.9992 16.0905 19.9612C16.5359 19.9242 16.7633 19.8572 16.9219 19.7748C17.2872 19.5851 17.585 19.2872 17.7748 18.9219C17.8572 18.7634 17.9242 18.536 17.9612 18.0905C17.9991 17.6331 18 17.041 18 16.17V11.169C18 10.3095 17.9923 10.0591 17.934 9.83793C17.878 9.62521 17.7873 9.42317 17.6655 9.23998C17.5389 9.04955 17.3568 8.87739 16.7145 8.3064L11.4748 3.64896C11.0806 3.29855 10.8276 3.07463 10.621 2.91817C10.4245 2.7694 10.3321 2.7311 10.2796 2.71579ZM9.16112 0.795564C9.70896 0.636016 10.2909 0.636016 10.8388 0.795564C11.2189 0.906267 11.5341 1.10095 11.8282 1.32363C12.1052 1.53335 12.4172 1.81064 12.7764 2.12995L18.0432 6.81159C18.0716 6.83679 18.0995 6.86165 18.1272 6.88619C18.6489 7.34941 19.0429 7.69935 19.3311 8.13277C19.5746 8.49916 19.7561 8.90321 19.8681 9.32867C20.0006 9.83196 20.0004 10.359 20 11.0566C20 11.0936 20 11.131 20 11.169V16.212C20 17.0305 20 17.7061 19.9543 18.2561C19.9069 18.8274 19.805 19.3523 19.5496 19.8439C19.1701 20.5745 18.5744 21.1701 17.8439 21.5496C17.3522 21.805 16.8274 21.9069 16.256 21.9543C15.706 22 15.0305 22 14.2119 22H13.805C13.7972 22 13.7894 22 13.7814 22C13.6603 22 13.5157 22.0001 13.3883 21.9895C13.2406 21.9773 13.0292 21.9458 12.8085 21.8311C12.5345 21.6888 12.3111 21.4654 12.1688 21.1915C12.0542 20.9707 12.0227 20.7593 12.0104 20.6116C11.9998 20.4843 11.9999 20.3396 11.9999 20.2185L12 17C12 15.8954 11.1045 15 9.99995 15C8.89538 15 7.99995 15.8954 7.99995 17L7.99996 20.2185C8.00001 20.3396 8.00006 20.4843 7.98949 20.6116C7.97722 20.7593 7.94572 20.9707 7.83107 21.1915C7.68876 21.4654 7.46538 21.6888 7.19142 21.8311C6.9707 21.9458 6.75929 21.9773 6.6116 21.9895C6.48423 22.0001 6.33959 22 6.21847 22C6.21053 22 6.20268 22 6.19495 22H5.78798C4.96944 22 4.29389 22 3.74388 21.9543C3.17253 21.9069 2.64769 21.805 2.15605 21.5496C1.42548 21.1701 0.829802 20.5745 0.4503 19.8439C0.194916 19.3523 0.0930525 18.8274 0.0456043 18.2561C-7.07172e-05 17.7061 -5.98695e-05 17.0305 -4.66373e-05 16.212L-4.61604e-05 11.169C-4.61604e-05 11.131 -6.55916e-05 11.0936 -8.47842e-05 11.0566C-0.000448015 10.359 -0.000722438 9.83196 0.131802 9.32866C0.243828 8.90321 0.425276 8.49916 0.668837 8.13277C0.956963 7.69935 1.35105 7.34941 1.87272 6.8862C1.90036 6.86165 1.92835 6.83679 1.95671 6.81159L7.22354 2.12996C7.58274 1.81064 7.89467 1.53335 8.17167 1.32363C8.46579 1.10095 8.78099 0.906267 9.16112 0.795564Z"
                    fill="red"
                    stroke={theme.colors.opb}
                  />
                </Svg> */}

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
        name="Task"
        component={Task}
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
      {!companyDetails && (
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
