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

const ProfilePhotoModal = ({type, modalVisible, setModalVisible}) => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {getProfileData, getProfileDataLoading} = useSelector(
    state => state.profile,
  );
  const [formData, setFormData] = useState({
    profilePhoto: '',
  });

  useEffect(() => {
    setFormData({
      profilePhoto: getProfileData?.profilePhoto,
    });
  }, [getProfileData]);

  const submit = () => {};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
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
                  setModalVisible(!modalVisible);
                }}>
                <Text center>Close</Text>
                {/* <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                    fill={theme.colors.text.primary}
                  />
                </Svg> */}
              </Touch>
              <Touch
                onPress={() => setModalVisible(false)}
                activeOpacity={0.6}
                height={40}
                br={8}
                p={10}
                bg="#fff"
                mb={8}>
                <Text center>Select Profile Picture</Text>
              </Touch>
              <Touch
                onPress={() => setModalVisible(false)}
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

export default ProfilePhotoModal;
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
