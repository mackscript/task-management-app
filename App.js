import React, {useEffect, useState} from 'react';
import {Text, View, Button, StatusBar} from 'react-native';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation/Navigation';
import store from './src/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {loadTheme} from './src/redux/reducer/themeSlice';
import {ToastProvider} from 'react-native-toast-notifications';
import {checkAuth} from './src/redux/reducer/authSlicer';

const MainApp = () => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadTheme()); // Load theme here
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        barStyle={theme.mode == 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={'transparent'}
      />
      <Navigation />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      {/* type: "normal | success | warning | danger | custom", */}
      <ToastProvider offsetTop={50}>
        <MainApp />
      </ToastProvider>
    </Provider>
  );
};

export default App;
