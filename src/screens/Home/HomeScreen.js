import React from 'react';
import {Text, View} from 'react-native';
import MainLayout from '../../components/layout/MainLayout';

const HomeScreen = props => {
  return (
    <MainLayout child={props} showHeader sName="dashboard" more back>
      <View>
        <Text>Home screen</Text>
      </View>
    </MainLayout>
  );
};

export default HomeScreen;
