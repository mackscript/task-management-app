import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../assets/icons/back.svg';
import UserCircleIcon from '../../assets/icons/user.svg';
import Notification from '../../assets/icons/notification.svg';

import LinearGradient from 'react-native-linear-gradient';
import UI, {Button, Div, Text, Touch} from '../common/UI';
import {toggleTheme} from '../../redux/reducer/themeSlice';
import Svg, {Path} from 'react-native-svg';
import {logout} from '../../redux/reducer/OtpVerifySlicer';
import RNRestart from 'react-native-restart'; // Import package from node modules

const MainLayout = ({
  children,
  child,
  wl,
  pf,
  showHeader,
  sName,
  more,
  back,
  loading,
}) => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {companyDetails} = useSelector(state => state.otp);

  const backScreen = () => {
    child.navigation.goBack();
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      locations={[0.3, 1, 1, 0.1]}
      end={{x: 1, y: 0.4}}
      colors={[
        theme.gradBG.midDark,
        theme.gradBG.dark,
        theme.gradBG.midDark,
        theme.gradBG.dark,
      ]}
      style={{flex: 1}}>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.2)',
            left: 0,
            zIndex: 1,
          }}>
          <ActivityIndicator
            // style={{marginTop: 80}}
            size="large"
            color={theme.colors.text.primary}
          />
        </View>
      )}
      <SafeAreaView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1, marginTop: 48}}>
        {showHeader && (
          <View
            style={{
              // height: 50,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingTop: 10,
              // backgroundColor: theme.colors.primary,
            }}>
            <Div width={'33.33%'}>
              {back && (
                <Touch
                  ml={10}
                  onPress={() => backScreen()}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Svg
                    width="30"
                    height="40"
                    viewBox="0 0 17 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M5.91667 8L0.75 4.5M0.75 4.5L5.91667 1M0.75 4.5L16.25 4.5"
                      stroke={theme.colors.text.primary}
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>

                  {/* <Text color={theme.colors.text.inverse}>Back</Text> */}
                </Touch>
              )}
              {wl && (
                <Div>
                  <Text
                    size={25}
                    style={{
                      color: theme.colors.text.primary,
                      textTransform: 'capitalize',
                    }}>
                    Welcome to,
                  </Text>
                  <Text
                    size={25}
                    style={{
                      color: theme.colors.text.primary,
                      textTransform: 'capitalize',
                    }}>
                    {companyDetails?.companyName}
                    {/* Parker .... */}
                  </Text>
                </Div>
              )}
            </Div>
            <Div width={'33.33%'}>
              {sName && (
                <Text
                  size={30}
                  center
                  style={{
                    color: theme.colors.text.primary,
                    textTransform: 'capitalize',
                  }}>
                  {sName}
                </Text>
              )}
            </Div>

            <View
              style={{
                width: '33.33%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              {more && (
                <Touch
                  onPress={() => {
                    // dispatch(logout());
                    // setTimeout(() => {
                    //   child.navigation.navigate('SignInScreen');
                    // }, 1000);
                  }}>
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 6.25C10 5.55964 10.5596 5 11.25 5C11.9404 5 12.5 5.55964 12.5 6.25C12.5 6.94036 11.9404 7.5 11.25 7.5C10.5596 7.5 10 6.94036 10 6.25ZM10 11.25C10 10.5596 10.5596 10 11.25 10C11.9404 10 12.5 10.5596 12.5 11.25C12.5 11.9404 11.9404 12.5 11.25 12.5C10.5596 12.5 10 11.9404 10 11.25ZM11.25 15C10.5596 15 10 15.5596 10 16.25C10 16.9404 10.5596 17.5 11.25 17.5C11.9404 17.5 12.5 16.9404 12.5 16.25C12.5 15.5596 11.9404 15 11.25 15Z"
                      fill={theme.colors.text.primary}
                    />
                  </Svg>
                </Touch>
              )}

              {pf && (
                <Touch
                  onPress={() => {
                    dispatch(toggleTheme());
                    // RNRestart.restart();
                  }}
                  bg={theme.colors.primary}
                  width={50}
                  height={50}
                  br={50}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // overflow: 'hidden',
                  }}>
                  <Image
                    style={{width: 50, borderRadius: 50, height: 50}}
                    source={{
                      uri: 'https://avatars.githubusercontent.com/u/68142061?v=4',
                    }}
                  />
                  {/* <View
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      left: -10,
                      top: 0,
                      transform: [{rotate: '20deg'}],
                    }}>
                    <Notification width={25} height={25} fill={'red'} />
                  </View> */}
                </Touch>
              )}
            </View>
          </View>
        )}
        <View style={{flex: 1}}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainLayout;
