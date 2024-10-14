import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Div, Text, Flex} from '../../components/common/UI';
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {toggleTheme} from '../../redux/reducer/themeSlice';
import MainLayout from '../../components/layout/MainLayout';
import GoogleIcon from '../../assets/icons/google.svg';
import AppleIcon from '../../assets/icons/apple.svg';
import User2Icon from '../../assets/icons/user2.svg';
import LockIcon from '../../assets/icons/lock.svg';
import EyeOpen from '../../assets/icons/eye-open.svg';
import EyeClose from '../../assets/icons/eye-close.svg';
import EmailIcon from '../../assets/icons/ai_mail.svg';

import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {fontScale} from '../../utils/utils';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const SignInScreen = props => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phNumber: '',
    Password: '',
    confirmPassword: '',
  });

  const submitBtn = () => {
    props.navigation.navigate('TabView');
  };

  const checkBiometric = async () => {
    await rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        console.log('resultObject', resultObject);
        const {available, biometryType} = resultObject;

        if (available && biometryType === BiometryTypes.TouchID) {
          Alert.alert(
            'TouchID',
            'Would you like to enable TouchID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: async () => {
                  Alert.alert(
                    'Success!',
                    'TouchID authentication enabled successfully!',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.FaceID) {
          checkBt();
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          const checkBiometrics = rnBiometrics.biometricKeysExist();
          console.log('check', checkBiometrics);
          // rnBiometrics
          //   .createKeys()
          //   .then(res => {
          //     console.log('res', res);
          //   })
          // rnBiometrics
          //   .simplePrompt({promptMessage: 'Confirm Face ID'})
          //   .then(result => {
          //     console.log('result', result);
          //     const {success} = result;
          //     if (success) {
          //       Alert.alert('Success!', 'Face ID authentication  successful!');
          //     } else {
          //       Alert.alert('Failed', 'Fingerprint authentication failed.');
          //     }
          //   })
          //   .catch(error => {
          //     console.error('Error during fingerprint prompt:', error);
          //     Alert.alert('Error', 'Fingerprint authentication failed.');
          //   });
        } else {
          Alert.alert(
            'Biometrics not supported',
            'This device does not support biometric authentication.',
          );
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert(
          'Error',
          'An error occurred while checking biometrics availability.',
        );
      });
  };

  const checkBt = async () => {
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    console.log('keysExist', keysExist);
    const r = await rnBiometrics.createKeys();
    console.log('r', r);

    if (keysExist) {
      rnBiometrics
        .createSignature({
          promptMessage: 'sing in',
          payload: '1234',
        })
        .then(res => {
          console.log('res', res);
          rnBiometrics
            .simplePrompt({promptMessage: 'Confirm Face ID'})
            .then(result => {
              console.log('result', result);
              const {success} = result;
              if (success) {
                Alert.alert('Success!', 'Face ID authentication  successful!');
              } else {
                Alert.alert('Failed', 'Fingerprint authentication failed.');
              }
            })
            .catch(error => {
              console.error('Error during fingerprint prompt:', error);
              Alert.alert('Error', 'Fingerprint authentication failed.');
            });
        })
        .catch(err => console.log('err', err));
    } else {
    }
  };

  useEffect(() => {
    // checkBiometric();
  }, []);
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv3UAlN9FCFkfAcM32hsyRV3tau188ry30qalA9eeSre289sw2yMmyuxygAS+jiOx3ecC66ACsEkYb3i6fFmWn3iHXIR5WLjS4Lm/BezrDO1JLwHSh5x2epRU9MgFHo4N252Vcr2b9IvTkn3HlAGUG4wJmkie1EsdYTzrI0HLj4j4+ZxlBGHZSA+/gJHNy5xZeQVc7IaYB1JZWZ4Wm9i0mSVXP1iI+SptKnBOW2Iz8X435x6f/Gev5V6A8j8EEpjZx4XjL0HhVlYSwB14S+q8jil9cD4KttxZP7qxERg94AIRC0XDy6wgOJCzESQAzKKOBVjuu7rs7pb+kwJGD7tIxwIDAQAB
  // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6ywSBYBxjSc14IOehO08We2QmZkh5U4Q6qm8Xu192xjfYVasQ/Wakb/7hY0EEHxr+54i7beuo3Stql4fifEYGbkYB9jRPw0KEXU3LcjMRE9lJAd3oE/z0PZjazWIqcanO1gUqNkCJVHCwiVo/9EdXDBwu1nW6m+IIKlNdK7RcedsUPG9ox9sOj0SFT1rAs8tCGh70rd+y0jIu+tAtNN/RRh+c6OH+cdMgBm9EIQpFAPpLlMfRcXEDhfwr74PojvU5/oh6ayZxO7rM9I0F2Wyo2vciGweDW5WH5EFTo0xBTbucsjrblqt1PABdOlOVFEP8dAXxeX64jbqK80KFfelKQIDAQAB
  // k1ZIj38SyTUen//lrwYy0MwmLn/XQ6r1QaC5qCQDPend3cwvMowTS9cSjpsVvF6wRU8WweAgGBJHpy+1v1PDsKJGPpu45XIe3AjS4u9pxqAlbxdhygCms/u0zd6mhgExE9q629aCCIpw++ne5/GBEujj6tb1NSFJnjUI/jNkqQL+K+CIp3cwvqSVlx3bmuu96THPwwmuUiOQtExd3H+SDKU0uT5YXI5CoYwnKdqxM1FeHbWIcZ9Hs9n5hzJhzNfPTv3U3Y4kZc1A01uZalp6Q1DhY5WgvZBEI3pEtVIby9e0/vBfNNrHdyodC6SdG4WKF2x2gGbs6ViT0Ed9R+PVvg==
  return (
    <MainLayout child={props}>
      <KeyboardAvoidingScrollView keyboardDismissMode="none">
        <Div style={style.container}>
          <Text
            width="45%"
            ml={'auto'}
            mr={'auto'}
            mt={Platform.OS == 'ios' ? '10%' : '40%'}
            center
            bold
            size={30}
            color={theme.colors.text.primary}>
            Welcome Back
          </Text>

          <Text
            center
            size={16}
            mt={2}
            bold
            color={theme.colors.text.secondary}>
            Log in to your account
          </Text>
          <Image
            style={{
              marginTop: '5%',

              width: 150,
              height: 150,
              marginLeft: 'auto',
              marginRight: 'auto',
              resizeMode: 'cover',
            }}
            source={require('../../assets/imgs/welcome.png')}
          />
          {/* <Flex middle spaceb mt={20}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[style.btn, {backgroundColor: theme.colors.secondary}]}>
              <GoogleIcon width={30} height={27} />
              <Text color={theme.colors.text.primary}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                checkBiometric();
                dispatch(toggleTheme());
              }}
              style={[style.btn, {backgroundColor: theme.colors.secondary}]}>
              <AppleIcon width={23} height={22} />
              <Text ml={4} color={theme.colors.text.primary}>
                Apple
              </Text>
            </TouchableOpacity>
          </Flex> */}
          {/* // input  */}
          {/* <Flex p={0} middle spaceb mt={20}>
            <View style={style.before}></View>
            <Text color={theme.colors.text.secondary}>or</Text>
            <View style={style.after}></View>
          </Flex> */}
          <Div mt={'10%'}>
            <Div mt={20}>
              <Flex
                middle
                p={Platform.OS == 'ios' ? 10 : 0}
                spaceb
                bw={1}
                br={10}
                pl={10}
                pr={10}
                bg={theme.colors.secondary}
                bc={theme.colors.border}>
                <Div>
                  <User2Icon width={23} height={22} />
                </Div>
                <TextInput
                  placeholderTextColor={theme.colors.text.secondary}
                  placeholder="Enter your username"
                  style={[style.inputStyle]}
                />
                <Div>{/* <AppleIcon width={23} height={22} /> */}</Div>
              </Flex>
            </Div>
            <Div mt={20}>
              <Flex
                middle
                p={Platform.OS == 'ios' ? 10 : 0}
                spaceb
                bw={1}
                br={10}
                pl={10}
                pr={10}
                bg={theme.colors.secondary}
                bc={theme.colors.border}>
                <Div>
                  <LockIcon width={23} height={22} />
                </Div>
                <TextInput
                  placeholderTextColor={theme.colors.text.secondary}
                  placeholder="Enter your password"
                  style={[style.inputStyle]}
                />
                <Div>
                  <EyeClose width={23} height={22} />
                </Div>
              </Flex>
            </Div>
          </Div>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('SignUpScreen');
            }}>
            <Text ml={6} color={theme.colors.primary} center mt={10}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          <Button
            onPress={() => submitBtn()}
            mt={'10%'}
            child={
              <Text color={theme.colors.text.white} bold size={18}>
                Submit
              </Text>
            }></Button>

          {/* <Flex center middle>
            <Text color={theme.colors.text.secondary} center mt={20}>
              You don't have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('SignUpScreen');
              }}>
              <Text ul ml={6} color={theme.colors.text.primary} center mt={20}>
                Sign up
              </Text>
            </TouchableOpacity>
          </Flex> */}
          <Flex column center middle mt={'15%'}>
            <Text color={theme.colors.text.secondary} center>
              Powered by Rebin infotech
            </Text>
            <Text color={theme.colors.text.secondary} center mt={6}>
              version - 1.0.0
            </Text>
          </Flex>
        </Div>
      </KeyboardAvoidingScrollView>
    </MainLayout>
  );
};

export default SignInScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btn: {
    height: 50,
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 12,
  },
  before: {
    marginTop: 2,
    height: 1,
    backgroundColor: '#737373',
    flex: 1,
    marginHorizontal: 6,
  },
  after: {
    marginTop: 2,
    height: 1,
    flex: 1,
    backgroundColor: '#737373',
    marginHorizontal: 6,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16 / fontScale,
    paddingHorizontal: 6,
  },
});
