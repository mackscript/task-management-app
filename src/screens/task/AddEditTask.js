import React, {useEffect, useRef, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {
  Button,
  Container,
  Div,
  Flex,
  Gradient,
  Text,
  Touch,
} from '../../components/common/UI';
import {useDispatch, useSelector} from 'react-redux';
import {
  Animated,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {fontScale} from '../../utils/utils';
import CalenderPickers from '../../components/common/calender/CalenderPickers';
import moment from 'moment';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import UploadImages from '../../components/common/UploadImges';
const priorityList = ['low', 'medium', 'high'];
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
import {Dropdown} from 'react-native-element-dropdown';
import {MultiSelect} from 'react-native-element-dropdown';
import * as Yup from 'yup';
import {getAllUsers, getUserBySearch} from '../../redux/reducer/UserSlicer';
import {submitTask} from '../../redux/reducer/TaskSlicer';
import {useToast} from 'react-native-toast-notifications';

const AddEditTask = ({showModal, setShowModal, title}) => {
  const toast = useToast();
  const navigates = useNavigation();
  const dispatch = useDispatch();

  const {getUserLoading, getUsers} = useSelector(state => state.users);
  // const {isLoadingTaskCreate} = useSelector(state => state.task);
  let isLoadingTaskCreate = false;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const buttonWidth = Dimensions.get('window').width * 0.3; // Assuming each button is 30% of screen width

  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);

  // state
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  const [images, setImages] = useState([]);
  const [showModalUploadImg, setShowModalUploadImg] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const [formData, setFormData] = useState({
    assignTo: [],
    title: '',
    description: '',
    priority: 'low',
    image: [],
  });

  const [errors, setErrors] = useState({});
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(8, 'Task title is too short.')
      .max(150, 'Task title is too long.')
      .required('Task title is required.'),
    assignTo: Yup.array()
      .min(1, 'At least one assignee is required.')
      .required('AssignTo field is required.'),
    description: Yup.string(),
    image: Yup.array(),
    priority: Yup.string(),
  });

  // Calendar
  const onDateChange = (date, type) => {
    setStartDate(date);
  };

  //upload images
  const uploadImages = () => {
    setShowModalUploadImg(true);
  };
  const handelUploadImg = img => {
    setImages([...images, img]);
  };

  const removeImg = index => {
    setImages(images.filter((_, i) => i !== index));
  };
  //search people

  //onChange

  useEffect(() => {
    if (getUsers?.result > 0) {
      let options = getUsers?.data?.map(el => {
        return {
          value: el?._id,
          label: `${el?.firstName} ${el?.lastName}`,
          profile: el?.image,
        };
      });
      setUsersData(options);
    }
  }, [getUsers]);

  // const handelSearchUser = text => {
  //   console.log('text', text);
  //   if (text.length >= 2) {

  //   } else {
  //     setUsersData([]);
  //   }
  // };
  const handleInputChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    validationSchema
      .validate(updatedFormData, {abortEarly: false})
      .then(() => {
        setErrors({});
      })
      .catch(err => {
        const newErrors = {};
        err.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };
  const animateBackground = selectedPriority => {
    setFormData({...formData, priority: selectedPriority});
    const index = priorityList.indexOf(selectedPriority);

    Animated.timing(animatedValue, {
      toValue: index * buttonWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  //  submit
  const submitBtn = async () => {
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      setLoading(true);
      const newValues = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        image: images,
        dueDate: startDate, // Deadline date in ISO format
        assignTo: [...formData.assignTo], // Replace with actual user IDs
      };

      dispatch(submitTask(newValues))
        .unwrap()
        .then(res => {
          animateBackground('low');
          toast.show(`Task Create successfully!`, {
            type: 'success',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'zoom-in',
          });

          setFormData({
            assignTo: [],
            title: '',
            description: '',
            priority: 'low',
            image: [],
          });
          setStartDate(new Date());

          setLoading(false);
          closeModalBack();
          setImages([]);
        })
        .catch(err => {
          setLoading(false);
          toast.show(`${res?.status?.message}`, {
            type: 'error',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'zoom-in',
          });
        });

      //
    } catch (error) {
      if (error.inner) {
        const formErrors = error.inner.reduce((acc, err) => {
          return {...acc, [err.path]: err.message};
        }, {});
        setErrors(formErrors);
        return;
      }
    }
  };

  //close
  const closeModalBack = () => {
    setShowModal(!showModal);
    navigates.navigate('HomeScreen');
    setFormData({
      assignTo: [],
      title: '',
      description: '',
      priority: 'low',
      image: [],
    });
    setStartDate(new Date());
  };

  const renderItem = (item, focusX) => {
    return (
      <Div
        // mb={2}
        pl={10}
        pt={15}
        pb={15}
        bg={focusX ? theme.colors.background : theme.colors.inputBack}>
        <Text size={16} color={theme.colors.text.primary}>
          {item.label}
        </Text>
      </Div>
    );
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
            <Flex p={15} middle spaceb>
              <Touch width="35%" p={6} mt={5} onPress={() => closeModalBack()}>
                <Svg
                  width="30"
                  height="40"
                  viewBox="0 0 17 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M5.91667 8L0.75 4.5M0.75 4.5L5.91667 1M0.75 4.5L16.25 4.5"
                    stroke={theme.colors.text.primary}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </Touch>
              <Text width="60%" size={18} color={theme.colors.text.primary}>
                {title}
              </Text>
            </Flex>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardDismissMode="none">
              {/* // inputs / */}
              <Container width={'95%'} ml mr>
                <Div>
                  <Text size={16} mb={6} color={theme.colors.text.secondary}>
                    Assign User
                  </Text>
                  <Flex
                    column
                    p={10}
                    bw={1}
                    br={10}
                    width={'100%'}
                    bg={theme.colors.inputBack}
                    bc={theme.colors.inputBorder}
                    style={{elevation: 0}}>
                    <MultiSelect
                      containerStyle={{
                        backgroundColor: theme.colors.inputBack,
                        borderColor: theme.colors.inputBorder,
                        borderWidth: 2,
                      }}
                      style={[
                        {
                          borderColor: 'transparent',
                          width: '100%',
                          backgroundColor: theme.colors.inputBack,
                        },
                        isFocus && {borderColor: 'blue'},
                      ]}
                      placeholderStyle={{color: theme.colors.text.primary}}
                      inputSearchStyle={{
                        color: theme.colors.text.primary,
                        fontSize: 14 / fontScale,
                        borderColor: theme.colors.inputBorder,
                        borderRadius: 10,

                        paddingHorizontal: 6,
                        backgroundColor: theme.colors.inputBack,
                      }}
                      iconStyle={styles.iconStyle}
                      data={usersData}
                      search
                      maxHeight={300}
                      // onChangeText={text => text}
                      labelField="label"
                      valueField="value"
                      selectedTextStyle={styles.selectedTextStyle}
                      selectedStyle={styles.selectedStyle}
                      placeholder={!isFocus ? 'Select User' : '...'}
                      searchPlaceholder="Search..."
                      value={formData.assignTo}
                      renderItem={renderItem}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item, label, image) => {
                        console.log('l', item);
                        const newFormData = {...formData, assignTo: [...item]};
                        setFormData(newFormData);

                        validationSchema
                          .validate(newFormData, {abortEarly: false})
                          .then(() => {
                            setErrors({});
                          })
                          .catch(err => {
                            const newErrors = {};
                            err.inner.forEach(error => {
                              newErrors[error.path] = error.message;
                            });
                            setErrors(newErrors);
                          });
                      }}
                      renderSelectedItem={(item, unSelect) => (
                        <Touch mt={10} mr={8} br={20} pl={2} pr={2} bw={1}>
                          <Flex pl={5} pr={10} pt={2} pb={2} middle>
                            <Image
                              style={{
                                width: 30,
                                height: 30,
                                marginRight: 10,
                                borderRadius: 50,
                              }}
                              source={{
                                uri: item.profile
                                  ? `data:image/jpeg;base64,${item.profile}`
                                  : `https://png.pngtree.com/png-vector/20240914/ourlarge/pngtree-cartoon-user-avatar-vector-png-image_13572228.png`,
                              }}
                            />
                            <Text
                              color={theme.colors.text.primary}
                              mr={8}
                              cp
                              size={14}
                              style={{}}>
                              {item.label}
                            </Text>
                            <Touch onPress={() => unSelect && unSelect(item)}>
                              <Svg
                                width="15"
                                height="15"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <Path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                                  fill={theme.colors.text.secondary}
                                />
                              </Svg>
                            </Touch>
                          </Flex>
                        </Touch>
                      )}
                      renderLeftIcon={() => (
                        <Div mr={6}>
                          <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <Path
                              d="M15.25 7C15.25 8.79493 13.7949 10.25 12 10.25V11.75C14.6234 11.75 16.75 9.62335 16.75 7H15.25ZM12 10.25C10.2051 10.25 8.75 8.79493 8.75 7H7.25C7.25 9.62335 9.37665 11.75 12 11.75V10.25ZM8.75 7C8.75 5.20507 10.2051 3.75 12 3.75V2.25C9.37665 2.25 7.25 4.37665 7.25 7H8.75ZM12 3.75C13.7949 3.75 15.25 5.20507 15.25 7H16.75C16.75 4.37665 14.6234 2.25 12 2.25V3.75ZM18.25 17.5C18.25 18.0294 17.8014 18.7105 16.6143 19.3041C15.4722 19.8751 13.8418 20.25 12 20.25V21.75C14.0242 21.75 15.8938 21.3414 17.2852 20.6457C18.6316 19.9725 19.75 18.9036 19.75 17.5H18.25ZM12 20.25C10.1582 20.25 8.52782 19.8751 7.38566 19.3041C6.19864 18.7105 5.75 18.0294 5.75 17.5H4.25C4.25 18.9036 5.36836 19.9725 6.71484 20.6457C8.10618 21.3414 9.97582 21.75 12 21.75V20.25ZM5.75 17.5C5.75 16.9706 6.19864 16.2895 7.38566 15.6959C8.52782 15.1249 10.1582 14.75 12 14.75V13.25C9.97582 13.25 8.10618 13.6586 6.71484 14.3543C5.36836 15.0275 4.25 16.0964 4.25 17.5H5.75ZM12 14.75C13.8418 14.75 15.4722 15.1249 16.6143 15.6959C17.8014 16.2895 18.25 16.9706 18.25 17.5H19.75C19.75 16.0964 18.6316 15.0275 17.2852 14.3543C15.8938 13.6586 14.0242 13.25 12 13.25V14.75Z"
                              fill={theme.colors.text.primary}
                            />
                          </Svg>
                        </Div>
                      )}
                    />
                  </Flex>
                  <Text color={theme.colors.error} mt={0} size={14}>
                    {errors.assignTo && errors.assignTo}
                  </Text>
                  {/* <Flex wrap>
                    {users.map((el, index) => (
                      <Div ml={10} key={index}>
                        <Text color={theme.colors.text.primary}>
                          {el.label}
                        </Text>
                      </Div>
                    ))}
                  </Flex> */}
                </Div>
                <Div mt={15}>
                  <Text size={16} mb={6} color={theme.colors.text.secondary}>
                    Title
                  </Text>
                  <Flex
                    middle
                    p={Platform.OS == 'ios' ? 10 : 0}
                    bw={1}
                    br={10}
                    pl={10}
                    pr={10}
                    bg={theme.colors.inputBack}
                    bc={theme.colors.inputBorder}
                    style={{elevation: 0}}>
                    <TextInput
                      focusable
                      value={formData.title}
                      onChangeText={value => handleInputChange('title', value)}
                      placeholderTextColor={theme.colors.text.secondary}
                      placeholder="Interview tomorrow..."
                      style={[
                        styles.inputStyle,
                        {color: theme.colors.text.primary},
                      ]}
                    />
                  </Flex>

                  <Text color={theme.colors.error} mt={0} size={14}>
                    {errors.title && errors.title}
                  </Text>
                </Div>
                <Div mt={15}>
                  <Text size={16} mb={6} color={theme.colors.text.secondary}>
                    Description
                  </Text>
                  <Flex
                    middle
                    p={Platform.OS == 'ios' ? 10 : 0}
                    bw={1}
                    br={10}
                    pl={10}
                    pr={10}
                    bg={theme.colors.inputBack}
                    bc={theme.colors.inputBorder}
                    style={{
                      elevation: 0,
                    }}>
                    <TextInput
                      multiline
                      numberOfLines={5}
                      value={formData.description}
                      onChangeText={value =>
                        handleInputChange('description', value)
                      }
                      placeholderTextColor={theme.colors.text.secondary}
                      placeholder="Enter task description"
                      style={[
                        styles.inputStyle,
                        {
                          textAlignVertical: 'top',
                        },
                        {color: theme.colors.text.primary},
                      ]}
                    />
                  </Flex>

                  {/* <Text color={theme.colors.error}>{errors?.phNumber}</Text> */}
                </Div>
                <Div mt={15}>
                  <Text size={16} mb={6} color={theme.colors.text.secondary}>
                    Due Date
                  </Text>
                  <Touch onPress={() => setIsDatePickerVisible(true)}>
                    <Flex
                      middle
                      p={15}
                      bw={1}
                      br={10}
                      pl={10}
                      pr={10}
                      bg={theme.colors.inputBack}
                      bc={theme.colors.inputBorder}
                      style={{
                        elevation: 0,
                      }}>
                      <Text size={16} color={theme.colors.text.primary}>
                        {moment(startDate).format('DD/MM/YYYY')}
                      </Text>
                    </Flex>
                  </Touch>
                  {/* <Text color={theme.colors.error}>{errors?.phNumber}</Text> */}
                </Div>

                <Div mt={15}>
                  <Text size={16} mb={6} color={theme.colors.text.secondary}>
                    Priority
                  </Text>
                  <Flex
                    spacea
                    middle
                    p={8}
                    bw={1}
                    width="100%"
                    br={10}
                    pl={10}
                    pr={10}
                    bg={theme.colors.inputBack}
                    bc={theme.colors.inputBorder}
                    style={{
                      elevation: 0,
                    }}>
                    <Animated.View
                      style={{
                        position: 'absolute',
                        height: 40,
                        width: buttonWidth,
                        backgroundColor: theme.colors.default, // Your desired color
                        borderRadius: 6,
                        transform: [{translateX: animatedValue}],
                      }}
                    />

                    {priorityList.map((el, index) => (
                      <AnimatedTouchable
                        key={index}
                        onPress={() => animateBackground(el)}
                        style={{
                          width: '30%',
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          cp
                          size={14}
                          bold
                          color={
                            el === formData.priority
                              ? theme.colors.primary
                              : theme.colors.text.primary
                          }
                          center>
                          {el}
                        </Text>
                      </AnimatedTouchable>
                    ))}
                  </Flex>
                </Div>
                <Div mt={15}>
                  <Text size={16} mb={6} color={theme.colors.text.secondary}>
                    Images
                  </Text>
                  <Touch
                    onPress={() => uploadImages()}
                    p={10}
                    center
                    alc
                    spacea
                    middle
                    bw={1}
                    br={10}
                    bg={theme.colors.inputBack}
                    bc={theme.colors.inputBorder}>
                    <Svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <Path
                        d="M22 14L19.061 11.8839C17.5338 10.7843 15.4467 10.898 14.0479 12.1569L9.95209 15.8431C8.55331 17.102 6.4662 17.2157 4.93901 16.1161L2 14M6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6C3.79086 2 2 3.79086 2 6V18C2 20.2091 3.79086 22 6 22ZM11 8.5C11 9.88071 9.88071 11 8.5 11C7.11929 11 6 9.88071 6 8.5C6 7.11929 7.11929 6 8.5 6C9.88071 6 11 7.11929 11 8.5Z"
                        stroke={theme.colors.text.primary}
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </Svg>
                    <Text mt={10} color={theme.colors.text.primary} center>
                      Attach a Photo to This Task
                    </Text>
                  </Touch>
                  <ScrollView horizontal>
                    <Flex middle>
                      {images.map((el, index) => (
                        <Div key={index} ml={8}>
                          <TouchableOpacity
                            onPress={() => removeImg(index)}
                            style={{
                              position: 'absolute',
                              zIndex: 1,
                              right: 4,
                              top: 4,
                              padding: 6,
                              backgroundColor: '#fff',
                              borderRadius: 50,
                            }}>
                            <Svg
                              width="10"
                              height="10"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
                                fill={theme.colors.primary}
                              />
                            </Svg>
                          </TouchableOpacity>
                          <Image
                            style={{
                              borderRadius: 6,
                              width: 120,
                              height: 80,
                              resizeMode: 'cover',
                            }}
                            source={{uri: `data:image/png;base64,${el}`}}
                          />
                        </Div>
                      ))}
                    </Flex>
                  </ScrollView>
                </Div>
                {loading ? (
                  <Button
                    mb={20}
                    mt={'2%'}
                    child={
                      <Text color={theme.colors.text.inverse} bold size={18}>
                        Loading...
                      </Text>
                    }></Button>
                ) : (
                  <Button
                    mb={20}
                    onPress={() => submitBtn()}
                    mt={'2%'}
                    child={
                      <Text color={theme.colors.text.inverse} bold size={18}>
                        Create Task
                      </Text>
                    }></Button>
                )}
              </Container>
            </ScrollView>
          </Gradient>
        </Div>
      </Div>

      <CalenderPickers
        range={false}
        startDate={startDate}
        setStartDate={setStartDate}
        // setEndDate={setEndDate}
        // endDate={endDate}
        onDateChange={onDateChange}
        isDatePickerVisible={isDatePickerVisible}
        setIsDatePickerVisible={setIsDatePickerVisible}
      />
      <UploadImages
        handelUploadImg={handelUploadImg}
        showModalUploadImg={showModalUploadImg}
        setShowModalUploadImg={setShowModalUploadImg}
      />
    </Modal>
  );
};

export default AddEditTask;
const styles = StyleSheet.create({
  centeredView: {
    marginTop: '5%',
    flex: 1,
    width: '100%',
    elevation: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14 / fontScale,
    paddingHorizontal: 6,
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
  selectedTextStyle: {},
  selectedStyle: {},
});
