import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Text} from '../../components/common/UI';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';
import AddEditTask from './AddEditTask';
import {getAllUsers} from '../../redux/reducer/UserSlicer';

const CreateTask = props => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const focused = props.navigation.addListener('focus', async () => {
      setShowModal(true);
      dispatch(getAllUsers());
    });
    return () => {
      focused();
    };
  }, []);

  return (
    <MainLayout child={props} sName={'Create Task'}>
      <AddEditTask
        title="New Task"
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </MainLayout>
  );
};

export default CreateTask;
