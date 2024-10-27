import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Text} from '../../components/common/UI';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

const CreateTask = props => {
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  return <MainLayout child={props} showHeader sName="" pf wl></MainLayout>;
};

export default CreateTask;
