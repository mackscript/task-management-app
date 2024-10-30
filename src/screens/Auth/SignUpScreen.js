import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Div, Text, Flex} from '../../components/common/UI';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
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
import PhoneIcon from '../../assets/icons/call.svg';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fontScale} from '../../utils/utils';
import * as Yup from 'yup';
import {ClipPath} from 'react-native-svg';
import {setLoginData, submitSignUp} from '../../redux/reducer/authSlicer';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = props => {
  const toast = useToast();

  const dispatch = useDispatch();

  const {theme} = useSelector(state => state.theme);
  const {signUpIsLoading} = useSelector(state => state.auth);
  const {isLogin} = useSelector(state => state.otp);
  console.log('isLogin', isLogin);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phNumber: '',
    password: '',
    confirmPassword: '',
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'First Name is too short')
      .max(50, 'First Name is too long')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(2, 'Last Name is too short')
      .max(50, 'Last Name is too long')
      .required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      )
      .min(8, 'Password is too short')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
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

  const handleSubmit = async () => {
    try {
      // Validate all form data
      await validationSchema.validate(formData, {abortEarly: false});
      // const values = {
      //   confirmPassword: 'Mack@123',
      //   email: 'msxassc1wk22@gmail.com',
      //   firstName: 'mack',
      //   lastName: 'parker2',
      //   password: 'Mack@123',
      //   phNumber: '7001186809',
      // };
      dispatch(submitSignUp(formData))
        .unwrap()
        .then(res => {
          console.log('res', res);
          toast.hideAll();
          toast.show(res.status.message, {
            type: 'success',
            placement: 'top',
            offset: 30,
            animationType: 'zoom-in',
          });
          props.navigation.navigate('OtpVerification', {
            login: false,
            values: formData,
          });
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
    } catch (error) {
      if (error.inner) {
        const formErrors = error.inner.reduce((acc, err) => {
          return {...acc, [err.path]: err.message};
        }, {});
        setErrors(formErrors);
      }
    }
  };

  return (
    <MainLayout child={props}>
      {/* <ScrollView keyboardDismissMode="none"> */}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="none">
        <Div style={style.container}>
          <Text
            width="45%"
            ml={'auto'}
            mr={'auto'}
            mt={Platform.OS == 'ios' ? '5%' : '5%'}
            center
            bold
            size={28}
            color={theme.colors.text.primary}>
            Register
          </Text>

          <Text
            center
            size={16}
            mt={10}
            bold
            color={theme.colors.text.secondary}>
            Create your new account
          </Text>
          <Image
            style={{
              marginTop: '0%',
              width: Platform.OS == 'ios' ? 180 : 200,
              height: Platform.OS == 'ios' ? 180 : 200,
              marginLeft: 'auto',
              marginRight: 'auto',
              resizeMode: 'cover',
            }}
            source={require('../../assets/imgs/data.png')}
          />
          {/* <Flex middle spaceb mt={5}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[style.btn, {backgroundColor: theme.colors.secondary}]}>
              <GoogleIcon width={30} height={27} />
              <Text color={theme.colors.text.primary}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => dispatch(toggleTheme())}
              style={[style.btn, {backgroundColor: theme.colors.secondary}]}>
              <AppleIcon width={23} height={22} />
              <Text ml={4} color={theme.colors.text.primary}>
                Apple
              </Text>
            </TouchableOpacity>
          </Flex> */}
          {/* // input  */}
          {/* <Flex p={0} middle spaceb mt={5}>
            <View style={style.before}></View>
            <Text color={theme.colors.text.secondary}>or</Text>
            <View style={style.after}></View>
          </Flex> */}
          <Div mt={Platform.OS == 'ios' ? 8 : 10}>
            <Flex p={0} middle spaceb>
              <Div width={'48%'}>
                <Flex
                  middle
                  p={Platform.OS == 'ios' ? 10 : 0}
                  spaceb
                  bw={1}
                  br={10}
                  pl={10}
                  bg={theme.colors.secondary}
                  pr={10}
                  bc={theme.colors.border}>
                  <Div>
                    <User2Icon width={23} height={22} fill={'#000'} />
                  </Div>
                  <TextInput
                    focusable
                    value={formData.firstName}
                    onChangeText={value =>
                      handleInputChange('firstName', value)
                    }
                    placeholderTextColor={theme.colors.text.secondary}
                    placeholder="First Name"
                    style={[
                      style.inputStyle,
                      {color: theme.colors.text.primary},
                    ]}
                  />
                  {/* <Div><AppleIcon width={23} height={22} /></Div> */}
                </Flex>

                <Text color={theme.colors.error} mt={4} size={12}>
                  {errors.firstName && errors.firstName}
                </Text>
              </Div>
              <Div width={'48%'}>
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
                    <User2Icon width={23} height={22} fill={'#000'} />
                  </Div>
                  <TextInput
                    focusable
                    value={formData.lastName}
                    onChangeText={value => handleInputChange('lastName', value)}
                    placeholderTextColor={theme.colors.text.secondary}
                    placeholder="Last Name"
                    style={[
                      style.inputStyle,
                      {color: theme.colors.text.primary},
                    ]}
                  />
                  {/* <Div>
                  <AppleIcon width={23} height={22} />
                </Div> */}
                </Flex>

                <Text color={theme.colors.error} mt={4} size={12}>
                  {errors.lastName && errors.lastName}
                </Text>
              </Div>
            </Flex>

            <Div mt={8}>
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
                  <EmailIcon width={23} height={22} />
                </Div>
                <TextInput
                  focusable
                  value={formData.email}
                  onChangeText={value => handleInputChange('email', value)}
                  placeholderTextColor={theme.colors.text.secondary}
                  placeholder="Email"
                  autoCapitalize="none"
                  style={[style.inputStyle, {color: theme.colors.text.primary}]}
                />
                <Div>{/* <AppleIcon width={23} height={22} /> */}</Div>
              </Flex>

              <Text color={theme.colors.error} mt={4} size={12}>
                {errors.email && errors.email}
              </Text>
            </Div>
            <Div mt={8}>
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
                  <PhoneIcon width={23} height={22} />
                </Div>
                <TextInput
                  focusable
                  value={formData.phNumber}
                  onChangeText={value => handleInputChange('phNumber', value)}
                  placeholderTextColor={theme.colors.text.secondary}
                  placeholder="Mobile Number"
                  style={[style.inputStyle, {color: theme.colors.text.primary}]}
                />
                <Div>{/* <AppleIcon width={23} height={22} /> */}</Div>
              </Flex>

              <Text color={theme.colors.error} mt={4} size={12}>
                {errors.phNumber && errors.phNumber}
              </Text>
            </Div>
            <Div mt={8}>
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
                  focusable
                  value={formData.password}
                  onChangeText={value => handleInputChange('password', value)}
                  placeholderTextColor={theme.colors.text.secondary}
                  placeholder="Password"
                  secureTextEntry={showPassword}
                  style={[style.inputStyle, {color: theme.colors.text.primary}]}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
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
            <Div mt={8}>
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
                  focusable
                  value={formData.confirmPassword}
                  onChangeText={value =>
                    handleInputChange('confirmPassword', value)
                  }
                  placeholderTextColor={theme.colors.text.secondary}
                  placeholder="Confirm Password"
                  style={[style.inputStyle, {color: theme.colors.text.primary}]}
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
                {errors.confirmPassword && errors.confirmPassword}
              </Text>
            </Div>
          </Div>

          {signUpIsLoading ? (
            <Button
              mt={30}
              child={
                <Text color={theme.colors.text.inverse} bold size={18}>
                  Loading..
                </Text>
              }></Button>
          ) : (
            <Button
              onPress={() => handleSubmit()}
              mt={30}
              child={
                <Text color={theme.colors.text.inverse} bold size={18}>
                  Submit
                </Text>
              }></Button>
          )}

          <Flex center middle>
            <Text color={theme.colors.text.secondary} center mt={10}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('SignInScreen');
              }}>
              <Text ul ml={6} color={theme.colors.text.primary} center mt={10}>
                Sign In
              </Text>
            </TouchableOpacity>
          </Flex>
        </Div>
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
    </MainLayout>
  );
};

export default SignUpScreen;
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
