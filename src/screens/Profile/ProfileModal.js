import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {Container, Div, Flex, Text, Touch} from '../../components/common/UI';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {fontScale} from '../../utils/utils';
import {
  fetchProfileData,
  updateBio,
  updateName,
  updatePhNumber,
  updatePosition,
} from '../../redux/reducer/ProfileSlicer';

const ProfileModal = ({type, modalVisible, setModalVisible}) => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {
    getProfileData,
    updateNameLoading,
    updatePhoneNumberLoading,
    updatePositionLoading,
    updateBioLoading,
    updateProfilePhotoLoading,
  } = useSelector(state => state.profile);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phNumber: '',
    position: '',
    bio: '',
  });

  useEffect(() => {
    setFormData({
      firstName: getProfileData?.firstName,
      lastName: getProfileData?.lastName,
      phNumber: getProfileData?.phNumber,
      position: getProfileData?.position,
      bio: getProfileData?.bio,
    });
  }, [getProfileData]);

  const [errors, setErrors] = useState();

  const handleInputChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    let newErrors = {...errors};

    switch (name) {
      case 'firstName':
        newErrors.firstName = value ? '' : 'First Name is required.';
        break;
      case 'lastName':
        newErrors.lastName = value ? '' : 'Last Name is required.';
        break;
      case 'phNumber':
        newErrors.phNumber = value ? '' : 'Phone Number is required.';
        break;
      default:
        break;
    }

    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
  };

  const submit = () => {
    const newErrors = {};

    switch (type) {
      case 'Name':
        if (!formData.firstName) {
          newErrors.firstName = 'First Name is required.';
        }
        if (!formData.lastName) {
          newErrors.lastName = 'Last Name is required.';
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        setErrors({});

        const newValues = {
          firstName: formData.firstName,
          lastName: formData.lastName,
        };
        dispatch(updateName(newValues))
          .unwrap()
          .then(res => {
            console.log('res', res);
            setModalVisible(!modalVisible);
            dispatch(fetchProfileData());
          })
          .catch(err => console.log('err', err));
        break;

      case 'Phone Number':
        if (formData.phNumber.length == 0) {
          newErrors.phNumber = 'Phone Number is required.';
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        setErrors({});
        dispatch(updatePhNumber({phNumber: formData.phNumber}))
          .unwrap()
          .then(res => {
            setModalVisible(!modalVisible);
            dispatch(fetchProfileData());
          })
          .catch(err => console.log('err', err));

        break;

      case 'Position':
        dispatch(updatePosition({position: formData.position}))
          .unwrap()
          .then(res => {
            setModalVisible(!modalVisible);
            dispatch(fetchProfileData());
          })
          .catch(err => console.log('err', err));
        break;
      case 'Bio':
        dispatch(updateBio({bio: formData.bio}))
          .unwrap()
          .then(res => {
            setModalVisible(!modalVisible);
            dispatch(fetchProfileData());
          })
          .catch(err => console.log('err', err));
        break;
      default:
        setErrors();
        // Handle any other cases
        break;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        setErrors();
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        locations={[0.3, 1, 1, 0.1]}
        end={{x: 1, y: 0.4}}
        colors={[
          theme.gradBG.midDark,
          theme.gradBG.dark,
          theme.gradBG.midDark,
          theme.gradBG.dark,
        ]}
        style={{flex: 1}}>
        <View style={styles.centeredView}>
          <Div width="100%" style={styles.modalView}>
            {updateNameLoading ||
            updatePhoneNumberLoading ||
            updatePositionLoading ||
            updateBioLoading ? (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  left: 0,
                  zIndex: 1,
                }}>
                <ActivityIndicator
                  size="large"
                  color={theme.colors.text.primary}
                />
              </View>
            ) : null}
            <Container width="95%" ml mr pl={6} pt={10}>
              <Flex middle spaceb>
                <Flex middle p={0}>
                  <Touch
                    onPress={() => {
                      setErrors();
                      setModalVisible(!modalVisible);
                    }}>
                    <Svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                        fill={theme.colors.text.primary}
                      />
                    </Svg>
                  </Touch>
                  <Text ml={20} size={20} color={theme.colors.text.primary}>
                    {type}
                  </Text>
                </Flex>
                <Div>
                  <Touch onPress={() => submit()}>
                    <Svg
                      width="17"
                      height="12"
                      viewBox="0 0 17 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.7071 0.292893C17.0976 0.683417 17.0976 1.31658 16.7071 1.70711L7.41421 11C6.63316 11.7811 5.36683 11.781 4.58579 11L0.292893 6.70711C-0.0976311 6.31658 -0.0976311 5.68342 0.292893 5.29289C0.683417 4.90237 1.31658 4.90237 1.70711 5.29289L6 9.58579L15.2929 0.292893C15.6834 -0.0976311 16.3166 -0.0976311 16.7071 0.292893Z"
                        fill={'#60a5fa'}
                      />
                    </Svg>
                  </Touch>
                </Div>
              </Flex>
              {/* inputCase  */}

              {type == 'Name' ? (
                <Div mt={10}>
                  <Flex
                    middle
                    p={Platform.OS == 'ios' ? 10 : 0}
                    // spaceb
                    bw={1}
                    br={10}
                    pl={10}
                    // bg={theme.gradBG.midDark}
                    pr={10}
                    bc={theme.colors.border}
                    style={{elevation: 0}}>
                    <TextInput
                      focusable
                      value={formData.firstName}
                      onChangeText={value =>
                        handleInputChange('firstName', value)
                      }
                      placeholderTextColor={theme.colors.text.secondary}
                      placeholder="First Name"
                      style={[
                        styles.inputStyle,

                        {color: theme.colors.text.primary},
                      ]}
                    />
                  </Flex>
                  <Text color={theme.colors.error}>{errors?.firstName}</Text>
                  <Flex
                    mt={20}
                    middle
                    p={Platform.OS == 'ios' ? 10 : 0}
                    spaceb
                    bw={1}
                    br={10}
                    pl={10}
                    // bg={theme.gradBG.midDark}
                    pr={10}
                    bc={theme.colors.border}
                    style={{elevation: 0}}>
                    <TextInput
                      focusable
                      value={formData.lastName}
                      onChangeText={value =>
                        handleInputChange('lastName', value)
                      }
                      placeholderTextColor={theme.colors.text.secondary}
                      placeholder="Last Name"
                      style={[
                        styles.inputStyle,

                        {color: theme.colors.text.primary},
                      ]}
                    />
                    {/* <Div><AppleIcon width={23} height={22} /></Div> */}
                  </Flex>
                  <Text color={theme.colors.error}>{errors?.lastName}</Text>
                </Div>
              ) : null}

              {type == 'Position' ? (
                <Div mt={10}>
                  <Flex
                    middle
                    p={Platform.OS == 'ios' ? 10 : 0}
                    // spaceb
                    bw={1}
                    br={10}
                    pl={10}
                    // bg={theme.gradBG.midDark}
                    pr={10}
                    bc={theme.colors.border}
                    style={{elevation: 0}}>
                    <TextInput
                      focusable
                      value={formData.position}
                      onChangeText={value =>
                        handleInputChange('position', value)
                      }
                      placeholderTextColor={theme.colors.text.secondary}
                      placeholder="Title at"
                      style={[
                        styles.inputStyle,
                        {color: theme.colors.text.primary},
                      ]}
                    />
                    {/* <Div><AppleIcon width={23} height={22} /></Div> */}
                  </Flex>
                </Div>
              ) : null}
              {type == 'Phone Number' ? (
                <Div mt={10}>
                  <Flex
                    middle
                    p={Platform.OS == 'ios' ? 10 : 0}
                    // spaceb
                    bw={1}
                    br={10}
                    pl={10}
                    // bg={theme.gradBG.midDark}
                    pr={10}
                    bc={theme.colors.border}
                    style={{elevation: 0}}>
                    <TextInput
                      focusable
                      value={formData.phNumber}
                      onChangeText={value =>
                        handleInputChange('phNumber', value)
                      }
                      placeholderTextColor={theme.colors.text.secondary}
                      placeholder="+91 *********"
                      style={[
                        styles.inputStyle,
                        {color: theme.colors.text.primary},
                      ]}
                    />
                  </Flex>
                  <Text color={theme.colors.error}>{errors?.phNumber}</Text>
                </Div>
              ) : null}
              {type == 'Bio' ? (
                <Div mt={10}>
                  <Flex
                    middle
                    p={Platform.OS == 'ios' ? 10 : 0}
                    // spaceb
                    //   minHight={90}
                    //   Maxheight={90}

                    bw={1}
                    br={10}
                    pl={10}
                    // bg={theme.gradBG.midDark}
                    pr={10}
                    bc={theme.colors.border}
                    style={{elevation: 0, minHeight: 90}}>
                    <TextInput
                      multiline
                      numberOfLines={5}
                      focusable
                      value={formData.bio}
                      onChangeText={value => handleInputChange('bio', value)}
                      placeholderTextColor={theme.colors.text.secondary}
                      placeholder="Short bio or current status"
                      style={[
                        styles.inputStyle,
                        {MaxHeight: '100%', minHeight: 90},
                        {color: theme.colors.text.primary},
                      ]}
                    />
                  </Flex>
                </Div>
              ) : null}
            </Container>
          </Div>
        </View>
      </LinearGradient>
    </Modal>
  );
};

export default ProfileModal;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    //  backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    flex: 1,
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
