import React from 'react';
import {Text, View, Button, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../../redux/reducer/themeSlice';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../assets/home.svg';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme?.colors?.background,
      }}>
      <Text style={{color: 'red'}}>Login Screen</Text>
      <HomeIcon width={24} height={24} fill="#fff" />

      <Button
        title="LOGIN YOUR ACCOUNT"
        onPress={() => navigation.navigate('TabView')}
      />
      <Button
        color={theme.colors.border}
        onPress={() => dispatch(toggleTheme())}
        title="Toggle Theme"
      />
    </View>
  );
};

export default Login;
