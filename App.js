import React, {useEffect, useState} from 'react';
import {Text, View, Button, StatusBar} from 'react-native';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './src/navigation/Navigation';
import store from './src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {loadTheme} from './src/redux/reducer/themeSlice';

const MainApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTheme()); // Load theme here
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Navigation />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
