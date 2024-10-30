import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Button, Div, Flex, Text, Touch} from '../../components/common/UI';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {OtpInput} from 'react-native-otp-entry';
import {
  getCompanyDetails,
  otpVerify,
  setLoginData,
  verifyLoginOtp,
} from '../../redux/reducer/OtpVerifySlicer';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerification = props => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  console.log('props', props.route.params.values);

  const [otp, setOtp] = useState('');

  const handleSubmitOtpVerification = () => {
    console.log('otp', otp);
    // props.navigation.navigate('CreateCompanyName');
    autoFilleSubmit();
  };

  const autoFilleSubmit = text => {
    const newValues = {
      otp: otp,
      email: props.route.params.values.email,
    };

    console.log('email', newValues);
    if (props.route.params.login) {
      dispatch(verifyLoginOtp(newValues))
        .unwrap()
        .then(res => {
          console.log('res', res);
          toast.hideAll();
          AsyncStorage.setItem('token', res.data.token);
          AsyncStorage.setItem(`userInfo`, JSON.stringify(res.data.user)); // Clear token on logout
          AsyncStorage.setItem('isLogin', 'true'); // Update isLogin status
          dispatch(
            setLoginData({
              isLogin: true,
              userData: {
                token: res.data.token,
                userInfo: res.data.user,
              },
            }),
          );
          toast.show(res.status.message, {
            type: 'success',
            placement: 'top',
            offset: 30,
            animationType: 'zoom-in',
          });
          dispatch(getCompanyDetails());
          props.navigation.navigate('TabView');
        })
        .catch(err => {
          toast.hideAll();
          toast.show(`${err?.status?.message}`, {
            type: 'error',
            placement: 'top',
            duration: 4000,
            offset: 1000,
            animationType: 'zoom-in',
          });
        });
    } else {
      dispatch(otpVerify(newValues))
        .unwrap()
        .then(res => {
          console.log('res', res);
          toast.hideAll();
          AsyncStorage.setItem('token', res.data.token);
          AsyncStorage.setItem(`userInfo`, JSON.stringify(res.data.user)); // Clear token on logout
          AsyncStorage.setItem('isLogin', 'true'); // Update isLogin status
          dispatch(
            setLoginData({
              isLogin: true,
              userData: {
                token: res.data.token,
                userInfo: res.data.user,
              },
            }),
          );
          toast.show(res.status.message, {
            type: 'success',
            placement: 'top',
            offset: 30,
            animationType: 'zoom-in',
          });
          props.navigation.navigate('CreateCompanyName');
        })
        .catch(err => {
          toast.hideAll();
          toast.show(`${err?.status?.message}`, {
            type: 'error',
            placement: 'top',
            duration: 4000,
            offset: 1000,
            animationType: 'zoom-in',
          });
        });
    }
  };
  return (
    <MainLayout showHeader child={props} back>
      <KeyboardAvoidingScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="none"
        style={{flex: 1}}>
        <Div style={style.container}>
          <Text size={20} bold mt={20} color={theme.colors.text.primary}>
            Verification Code
          </Text>
          <Text
            width="80%"
            mt={6}
            size={18}
            color={theme.colors.text.secondary}>
            We have sent the Verification code to your email address
          </Text>
          <Text
            width="80%"
            mt={6}
            size={18}
            color={theme.colors.text.secondary}>
            ripon******@gmail.com
          </Text>
          <Div mt={60}>
            <OtpInput
              numberOfDigits={6}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={text => setOtp(text)}
              // onFilled={text => autoFilleSubmit(text)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                containerStyle: {},
                pinCodeContainerStyle: {
                  borderWidth: 1,
                  borderColor: theme.colors.text.secondary,
                },
                pinCodeTextStyle: {color: theme.colors.text.primary},
                focusStickStyle: {backgroundColor: theme.colors.primary},
                focusedPinCodeContainerStyle: {
                  borderColor: theme.colors.text.secondary,
                  color: theme.colors.primary,
                },
              }}
            />
          </Div>
          <View
          // style={{position: 'absolute', width: '100%', bottom: '10%'}}
          >
            <Button
              onPress={() => handleSubmitOtpVerification()}
              mt={100}
              width={'100%'}
              child={
                <Text color={theme.colors.text.inverse} bold size={18}>
                  Confirm
                </Text>
              }></Button>
            <Flex center middle>
              <Text color={theme.colors.text.secondary} center mt={10}>
                Don't receive OTP code
              </Text>
              <Touch
                onPress={() => {
                  props.navigation.navigate('SignInScreen');
                }}>
                <Text
                  ul
                  ml={6}
                  color={theme.colors.text.primary}
                  center
                  mt={10}>
                  Resend Code
                </Text>
              </Touch>
            </Flex>
          </View>
        </Div>
      </KeyboardAvoidingScrollView>
    </MainLayout>
  );
};

export default OtpVerification;
const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
