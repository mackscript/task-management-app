import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Div, Text, Flex} from '../../components/common/UI';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
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

const SignInScreen = props => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);

  const submitBtn = () => {
    props.navigation.navigate('TabView');
  };
  return (
    <MainLayout child={props}>
      <KeyboardAvoidingScrollView keyboardDismissMode="none">
        <Div style={style.container}>
          <Text
            width="45%"
            ml={'auto'}
            mr={'auto'}
            mt={Platform.OS == 'ios' ? '15%' : '40%'}
            center
            bold
            size={35}
            color={theme.colors.text.primary}>
            Welcome Back
          </Text>

          <Text
            center
            size={17}
            mt={10}
            bold
            color={theme.colors.text.secondary}>
            Login to your account
          </Text>
          <Flex middle spaceb mt={20}>
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
          </Flex>
          {/* // input  */}
          <Flex p={0} middle spaceb mt={20}>
            <View style={style.before}></View>
            <Text color={theme.colors.text.secondary}>
              or
              {/* with continue with email */}
            </Text>
            <View style={style.after}></View>
          </Flex>
          <Div mt={30}>
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
                  <EmailIcon width={23} height={22} />
                </Div>
                <TextInput
                  placeholderTextColor={theme.colors.text.secondary}
                  placeholder="mackp*****@gmail.com"
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
                  placeholder="**********"
                  style={[style.inputStyle]}
                />
                <Div>
                  <EyeClose width={23} height={22} />
                </Div>
              </Flex>
            </Div>
          </Div>
          <Button
            onPress={() => submitBtn()}
            mt={30}
            child={
              <Text color={theme.colors.text.white} bold size={18}>
                Submit
              </Text>
            }></Button>

          <Flex center middle>
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
