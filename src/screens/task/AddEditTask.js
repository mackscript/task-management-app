import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Flex, Gradient, Text, Touch} from '../../components/common/UI';
import {useSelector} from 'react-redux';
import {Modal, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';

const AddEditTask = ({showModal, setShowModal}) => {
  const navigates = useNavigation();
  useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);

  const closeModalBack = () => {
    setShowModal(!showModal);
    navigates.navigate('AllTask');
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        closeModalBack();
      }}>
      <Div style={styles.centeredView}>
        <Div style={styles.modalView}>
          <Gradient style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <Touch ml="auto" mr={20} mt={10} onPress={() => closeModalBack()}>
              <Svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                  fill="#0F1729"
                />
              </Svg>
            </Touch>
          </Gradient>
        </Div>
      </Div>
    </Modal>
  );
};

export default AddEditTask;
const styles = StyleSheet.create({
  centeredView: {
    marginTop: '15%',
    flex: 1,
    width: '100%',
    elevation: 10,
  },
  modalView: {
    width: '100%',
    height: '100%',
    orderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //  backgroundColor: 'red',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
