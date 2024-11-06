import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {
  Container,
  Div,
  Flex,
  Gradient,
  Text,
  Touch,
} from '../../components/common/UI';
import {useSelector} from 'react-redux';
import {Modal, Platform, ScrollView, StyleSheet, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {fontScale} from '../../utils/utils';
import CalenderPickers from '../../components/common/calender/CalenderPickers';
import moment from 'moment';

const AddEditTask = ({showModal, setShowModal, title}) => {
  const navigates = useNavigation();
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  // state
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onDateChange = (date, type) => {
    // if (type === 'END_DATE') {
    //   setEndDate(date);
    // } else {
    setStartDate(date);
    //   setEndDate(null);
    // }
  };
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    image: '',
    dueDate: '',
    assignTo: '',
  });
  // Calendar

  //search people

  //onChange

  //  submit

  //close
  const closeModalBack = () => {
    setShowModal(!showModal);
    navigates.navigate('HomeScreen');
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
              <Touch width="45%" p={6} mt={5} onPress={() => closeModalBack()}>
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
            {/* // inputs / */}
            <Container width={'90%'} ml mr>
              <Div>
                <Text size={18} mb={6} color={theme.colors.text.secondary}>
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
                    // value={formData.phNumber}
                    // onChangeText={value => handleInputChange('phNumber', value)}
                    placeholderTextColor={theme.colors.text.secondary}
                    placeholder="Interview tomorrow..."
                    style={[
                      styles.inputStyle,
                      {color: theme.colors.text.primary},
                    ]}
                  />
                </Flex>
                {/* <Text color={theme.colors.error}>{errors?.phNumber}</Text> */}
              </Div>
              <Div mt={15}>
                <Text size={18} mb={6} color={theme.colors.text.secondary}>
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
                    // value={formData.phNumber}
                    // onChangeText={value => handleInputChange('phNumber', value)}
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
                <Text size={18} mb={6} color={theme.colors.text.secondary}>
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
                    <Text size={18} color={theme.colors.text.primary}>
                      {moment(startDate).format('DD/MM/YYYY')}
                    </Text>
                  </Flex>
                </Touch>
                {/* <Text color={theme.colors.error}>{errors?.phNumber}</Text> */}
              </Div>
            </Container>
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
    </Modal>
  );
};

export default AddEditTask;
const styles = StyleSheet.create({
  centeredView: {
    marginTop: '10%',
    flex: 1,
    width: '100%',
    elevation: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16 / fontScale,
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
});
