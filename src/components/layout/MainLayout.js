import React from 'react';
import {
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

const MainLayout = ({
  children,
  child,
  wl,
  pf,
  showHeader,
  sName,
  more,
  back,
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
      <SafeAreaView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1, marginTop: 48}}>
        {showHeader && (
          <View
            style={{
              // height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              // backgroundColor: theme.colors.primary,
            }}>
            <Div width={wl ? 200 : 40}>
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
                    size={28}
                    style={{
                      color: theme.colors.text.primary,
                      textTransform: 'capitalize',
                    }}>
                    Welcome to,
                  </Text>
                  <Text
                    size={28}
                    style={{
                      color: theme.colors.text.primary,
                      textTransform: 'capitalize',
                    }}>
                    {companyDetails?.companyName}
                  </Text>
                </Div>
              )}
            </Div>
            <View>
              {sName && (
                <Text
                  size={20}
                  style={{
                    color: theme.colors.text.primary,
                    textTransform: 'capitalize',
                  }}>
                  {sName}
                </Text>
              )}
            </View>

            <View>
              {more && (
                <Touch
                  onPress={() => {
                    dispatch(logout());
                    setTimeout(() => {
                      child.navigation.navigate('SignInScreen');
                    }, 1000);
                  }}>
                  <UserCircleIcon width={24} height={24} fill={'#fff'} />
                </Touch>
              )}
              {pf && (
                <Touch
                  onPress={() => {
                    dispatch(toggleTheme());
                  }}
                  bg={theme.colors.primary}
                  width={60}
                  height={60}
                  br={50}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    // overflow: 'hidden',
                  }}>
                  <Image
                    style={{width: 60, borderRadius: 50, height: 60}}
                    source={{
                      uri: 'https://avatars.githubusercontent.com/u/68142061?v=4',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      left: -10,
                      top: 0,
                      transform: [{rotate: '20deg'}],
                    }}>
                    <Notification width={25} height={25} fill={'red'} />
                  </View>
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
