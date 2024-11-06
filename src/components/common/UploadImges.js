import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  Container,
  Div,
  Flex,
  Gradient,
  Text,
  Touch,
} from '../../components/common/UI';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {fontScale} from '../../utils/utils';
import ImagePicker from 'react-native-image-crop-picker';
import {
  fetchProfileData,
  updateProfilePhoto,
} from '../../redux/reducer/ProfileSlicer';

const UploadImages = ({
  handelUploadImg,
  showModalUploadImg,
  setShowModalUploadImg,
}) => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {getProfileData, getProfileDataLoading, updateProfilePhotoLoading} =
    useSelector(state => state.profile);

  const openGlary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setShowModalUploadImg(false);
        handelUploadImg(image.data);
      })
      .catch(err => {
        setShowModalUploadImg(false);
        console.log('err', err);
      });
  };
  const takeAPhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setShowModalUploadImg(false);
        handelUploadImg(image.data);
      })
      .catch(err => {
        setShowModalUploadImg(false);
        console.log('err', err);
      });
  };
  const submit = () => {};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModalUploadImg}
      onRequestClose={() => {
        setShowModalUploadImg(!showModalUploadImg);
      }}>
      <View style={styles.centeredView}>
        <Div width="100%" style={styles.modalView}>
          <Gradient>
            <Container width="80%" ml mr pb={30} pt={10}>
              <Touch
                mb={10}
                p={10}
                ml="auto"
                onPress={() => {
                  setShowModalUploadImg(!showModalUploadImg);
                }}>
                <Text center color={theme.colors.text.primary}>
                  Close
                </Text>
              </Touch>
              <Touch
                onPress={() => openGlary()}
                activeOpacity={0.6}
                height={40}
                br={8}
                p={10}
                bg="#fff"
                mb={8}>
                <Text center>Select Profile Picture</Text>
              </Touch>
              <Touch
                onPress={() => takeAPhoto()}
                activeOpacity={0.6}
                height={40}
                br={8}
                p={10}
                bg="#fff"
                mb={8}>
                <Text center>Take a Photo</Text>
              </Touch>
            </Container>
          </Gradient>
        </Div>
      </View>
    </Modal>
  );
};

export default UploadImages;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    position: 'absolute',
    //  height: 200,
    bottom: 0,
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16 / fontScale,
    paddingHorizontal: 6,
  },
});
