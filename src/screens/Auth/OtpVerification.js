import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Button, Div, Flex, Text, Touch} from '../../components/common/UI';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {OtpInput} from 'react-native-otp-entry';

const OtpVerification = props => {
  const {theme} = useSelector(state => state.theme);

  const handleSubmitOtpVerification = () => {
    props.navigation.navigate('CreateCompanyName');
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
              numberOfDigits={5}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={text => console.log(text)}
              onFilled={text => console.log(`OTP is ${text}`)}
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
