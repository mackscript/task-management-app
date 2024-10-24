import React, {useEffect, useState} from 'react';
import {View, Button, StatusBar} from 'react-native';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation/Navigation';
import store from './src/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {loadTheme} from './src/redux/reducer/themeSlice';
import {ToastProvider} from 'react-native-toast-notifications';
import {checkAuth} from './src/redux/reducer/authSlicer';
import {Div, Flex, Text} from './src/components/common/UI';

const MainApp = () => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadTheme()); // Load theme here
  }, [dispatch]);

  return (
    <NavigationContainer>
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
