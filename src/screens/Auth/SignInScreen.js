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
import * as Yup from 'yup';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {fontScale} from '../../utils/utils';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {setLoginData, submitLogin} from '../../redux/reducer/authSlicer';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = props => {
  const toast = useToast();
  const {loginLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format.') // Ensures the string is a valid email
      .max(50, 'Email is too long.')
      .required('Email is required.'),
    password: Yup.string()
      .min(8, 'Password is too short.')
      .required('Password is required.'),
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Validate the entire form every time a field changes
    validationSchema
      .validate(updatedFormData, {abortEarly: false})
      .then(() => {
        setErrors({}); // Clear all errors if valid
      })
      .catch(err => {
        const newErrors = {};
        err.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors); // Set errors for all fields
      });
  };

  const submitBtn = async () => {
    //
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      dispatch(submitLogin(formData))
        .unwrap()
        .then(res => {
          if (res?.status?.isSuccess) {
            toast.hideAll();
            AsyncStorage.setItem('token', res.data.token);
            AsyncStorage.setItem(`userInfo`, JSON.stringify(res.data.user));
            AsyncStorage.setItem('isLogin', 'true');
            dispatch(
              setLoginData({
                isLogin: true,
                userData: {
                  token: res.data.token,
                  userInfo: res.data.user,
                },
              }),
            );
            toast.show(`You’ve successfully logged in!`, {
              type: 'success',
              placement: 'top',
              duration: 4000,
              offset: 30,
              animationType: 'zoom-in',
            });
          }
          props.navigation.navigate('OtpVerification');
        })
        .catch(err => {
          toast.hideAll();
          toast.show(`${err?.status?.errorMessage}`, {
            type: 'error',
            placement: 'top',
            duration: 4000,
            offset: 1000,
            animationType: 'zoom-in',
          });
        });

      //
    } catch (error) {
      if (error.inner) {
        const formErrors = error.inner.reduce((acc, err) => {
          return {...acc, [err.path]: err.message};
        }, {});
        setErrors(formErrors);
        return;
      }
    }
  };

  return (
    <MainLayout child={props}>
      <KeyboardAvoidingScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="none">
        <Div style={style.container}>
          <Text
            width="45%"
            ml={'auto'}
            mr={'auto'}
            mt={Platform.OS == 'ios' ? '5%' : '10%'}
            center
            size={28}
            color={theme.colors.text.primary}>
            Welcome Back
          </Text>

          <Text center size={16} mt={2} color={theme.colors.text.secondary}>
            Log in to your account
          </Text>
          <Image
            style={{
              marginTop: '10%',
              width: Platform.OS == 'ios' ? 180 : 200,
              height: Platform.OS == 'ios' ? 180 : 200,
              height: 200,
              marginLeft: 'auto',
              marginRight: 'auto',
              resizeMode: 'cover',
            }}
            source={require('../../assets/imgs/data.png')}
          />
          {/* <Flex middle spaceb mt={2}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[style.btn, {backgroundColor: theme.colors.secondary}]}>
              <GoogleIcon width={30} height={27} />
              <Text color={theme.colors.text.primary}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                // dispatch(toggleTheme());
                toast.hideAll();
                toast.show(`You’ve successfully logged in!`, {
                  title: 'login :',
                  type: 'custom',
                  placement: 'top',
                  duration: 2000,
                  animationType: 'slide-in',
                });
              }}
              style={[style.btn, {backgroundColor: theme.colors.secondary}]}>
              <AppleIcon width={23} height={22} />
              <Text ml={4} color={theme.colors.text.primary}>
                Apple
              </Text>
            </TouchableOpacity>
          </Flex>
          
          <Flex p={0} middle spaceb mt={6}>
            <View style={style.before}></View>
            <Text color={theme.colors.text.secondary}>or</Text>
            <View style={style.after}></View>
          </Flex> */}
          <Div>
            <Div mt={40}>
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
                  placeholder="Enter your email"
                  style={[style.inputStyle, {color: theme.colors.text.primary}]}
                  onChangeText={value => handleInputChange('email', value)}
                  autoCapitalize="none" // Disables automatic capitalization
                  keyboardType="email-address"
                />
                <Div>{/* <AppleIcon width={23} height={22} /> */}</Div>
              </Flex>
              <Text color={theme.colors.error} mt={4} size={12}>
                {errors.email && errors.email}
              </Text>
            </Div>
            <Div mt={10}>
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
                  style={[style.inputStyle, {color: theme.colors.text.primary}]}
                  onChangeText={value => handleInputChange('password', value)}
                  secureTextEntry={showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeClose width={23} height={22} />
                  ) : (
                    <EyeOpen width={23} height={22} />
                  )}
                </TouchableOpacity>
              </Flex>
              <Text color={theme.colors.error} mt={4} size={12}>
                {errors.password && errors.password}
              </Text>
            </Div>
          </Div>

          <TouchableOpacity
            onPress={() => {
              dispatch(toggleTheme());
              // props.navigation.navigate('SignUpScreen');
            }}>
            <Text ml={6} color={theme.colors.text.secondary} center mt={1}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          {loginLoading ? (
            <Button
              mt={'5%'}
              child={
                <Text color={theme.colors.text.inverse} bold size={18}>
                  Loading...
                </Text>
              }></Button>
          ) : (
            <Button
              onPress={() => submitBtn()}
              mt={'5%'}
              child={
                <Text color={theme.colors.text.inverse} bold size={18}>
                  Submit
                </Text>
              }></Button>
          )}

          <Flex center middle mt={10}>
            <Text color={theme.colors.text.secondary} center>
              You don't have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('SignUpScreen');
              }}>
              <Text ul ml={6} color={theme.colors.text.primary} center>
                Sign up
              </Text>
            </TouchableOpacity>
          </Flex>
          <Flex column center middle mt={'10%'}>
            <Text color={theme.colors.text.secondary} center>
              Powered by mackScript
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
    width: '85%',
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
