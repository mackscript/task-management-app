import React, {useEffect, useState} from 'react';
import {View, Button, StatusBar, ActivityIndicator} from 'react-native';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation/Navigation';
import store from './src/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {loadTheme} from './src/redux/reducer/themeSlice';
import {ToastProvider} from 'react-native-toast-notifications';
import {checkToken, logout, setLoginData} from './src/redux/reducer/authSlicer';
import {Div, Flex, Text} from './src/components/common/UI';
import MainLayout from './src/components/layout/MainLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainApp = () => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {checkTokenLoading} = useSelector(state => state.auth);
  console.log('checkTokenLoading', checkTokenLoading);

  const handleTokenCheck = async () => {
    try {
      dispatch(checkToken())
        .unwrap()
        .then(async res => {
          console.log('res', res);

          const token = await AsyncStorage.getItem('token');
          const userInfo = await AsyncStorage.getItem('userInfo');
          dispatch(
            setLoginData({
              isLogin: true,
              loginData: {
                token,
                userInfo: JSON.parse(userInfo),
              },
            }),
          );
        })
        .catch(err => {
          console.log('err', err);
          dispatch(logout());
        });

      // if (checkToken.fulfilled.match(result)) {
      //   const isValidToken = result.payload; // true or false

      //   if (isValidToken) {
      //     // Dispatch an action to set the login data
      //     dispatch(
      //       setLoginData({
      //         isLogin: true,
      //         loginData: {
      //           token,
      //           userInfo: JSON.parse(userInfo),
      //         },
      //       }),
      //     );
      //   } else {
      //     // Handle the case for invalid token
      //     dispatch(logout()); // or any other action
      //   }
      // }
    } catch (error) {
      console.error('Error checking token:', error);
      // Optionally dispatch an error action to handle it in your Redux state
      // dispatch(setError(error.message));
    }
  };
  useEffect(() => {
    handleTokenCheck();

    dispatch(loadTheme()); // Load theme here
  }, [dispatch]);

  return (
    <NavigationContainer>
      {checkTokenLoading ? (
        <MainLayout>
          <Flex column center middle style={{flex: 1}}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </Flex>
        </MainLayout>
      ) : (
        <ToastProvider
          offsetTop={100}
          renderToast={toastOptions => (
            <Div
              style={{
                backgroundColor:
                  toastOptions.type == 'success'
                    ? '#16a34a'
                    : toastOptions.type == 'custom'
                    ? theme.colors.primary
                    : toastOptions.type == 'warning'
                    ? '#fbbf24'
                    : toastOptions.type == 'error'
                    ? '#f43f5e'
                    : '',

                borderRadius: 6,
                elevation: 8,
              }}>
              <Div p={10} style={{}}>
                {toastOptions.title ? (
                  <Div mb={8}>
                    <Text
                      bold
                      size={16}
                      style={{
                        color: theme.colors.text.inverse,
                      }}>
                      {toastOptions.title}
                    </Text>
                  </Div>
                ) : null}

                <Text
                  style={{
                    color: theme.colors.text.inverse,
                  }}>
                  {toastOptions.message}
                </Text>
              </Div>
            </Div>
          )}>
          <StatusBar
            translucent={true}
            barStyle={theme.mode == 'light' ? 'dark-content' : 'light-content'}
            backgroundColor={'transparent'}
          />
          <Navigation />
        </ToastProvider>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      {/* type: "normal | success | warning | danger | custom", */}
      <MainApp />
    </Provider>
  );
};

export default App;
