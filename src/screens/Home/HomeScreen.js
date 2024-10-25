import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Text} from '../../components/common/UI';
import {useSelector} from 'react-redux';

const HomeScreen = props => {
  const {theme} = useSelector(state => state.theme);
  const {loginData} = useSelector(state => state.auth);
  console.log('loginData', loginData);
  return (
    <MainLayout child={props} showHeader sName="dashboard" more>
      <Div>
        <Text color={theme.colors.text.primary}>Home screen</Text>
      </Div>
    </MainLayout>
  );
};

export default HomeScreen;
