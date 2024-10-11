import React from 'react';
import {Text, View, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../../redux/reducer/themeSlice';
import MainLayout from '../../components/layout/MainLayout';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme?.colors?.background,
        }}>
        <Text style={{color: 'red'}}>Login Screen</Text>
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
    </MainLayout>
  );
};

export default Login;
