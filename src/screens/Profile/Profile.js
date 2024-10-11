import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Text} from '../../components/common/UI';
import {useSelector} from 'react-redux';

const Profile = props => {
  const {theme} = useSelector(state => state.theme);

  return (
    <MainLayout child={props} showHeader sName="dashboard" more back>
      <Div>
        <Text color={theme.colors.text.primary}>Profile screen</Text>
      </Div>
    </MainLayout>
  );
};
export default Profile;
