import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {Flex, Text} from '../UI';
import Svg, {Path} from 'react-native-svg';
import {useSelector} from 'react-redux';

const CalenderPickers = ({
  setStartDate,
  setEndDate,
  isDatePickerVisible,
  onDateChange,
  setIsDatePickerVisible,
  startDate,
  endDate,
  range,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {theme} = useSelector(state => state.theme);
  const disablePastDates = date => {
    return moment(date).isBefore(moment(), 'day'); // Returns true for past dates
  };

  // // Calendar
  // const onDateChange = (date, type) => {
  //   // if (type === 'END_DATE') {
  //   //   setEndDate(date);
  //   // } else {
  //   setStartDate(date);
  //   //   setEndDate(null);
  //   // }
  // };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isDatePickerVisible}
      onRequestClose={() => {
        setStartDate(startDate);
        {
          range && setEndDate(null);
        }
        setIsDatePickerVisible(!isDatePickerVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Flex middle mb={10} spaceb p={0}>
            <Text color={'green'} bold size={18}></Text>
            <TouchableOpacity
              style={{
                padding: 6,
              }}
              onPress={() => {
                setIsDatePickerVisible(!isDatePickerVisible);
                setStartDate(startDate);
                {
                  range && setEndDate(null);
                }
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
                  fill={theme.colors.text.secondary}
                />
              </Svg>
            </TouchableOpacity>
          </Flex>
          <CalendarPicker
            // onMonthChange={month => onMonthChange(month)}
            // initialView="years"
            // initialDate={getDate.getStartDate}

            initialDate={
              startDate == null ? moment().format('YYYY-MM-DD') : startDate
            }
            selectedStartDate={startDate}
            selectedEndDate={range ? endDate : null}
            previousTitleStyle={{color: '#000'}}
            nextTitleStyle={{color: '#000'}}
            width={Dimensions.get('window').width - 60}
            startFromMonday={true}
            allowRangeSelection={range}
            todayTextStyle={{fontWeight: 'bold'}}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor={'red'}
            selectedDayTextColor="#FFFFFF"
            disabledDates={disablePastDates}
            // customDatesStyles={transformedDataAll}
            onDateChange={onDateChange}
          />
          {range ? (
            <Flex column middle>
              {startDate && endDate && (
                <TouchableOpacity
                  onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}
                  style={{
                    width: '40%',
                    padding: 10,
                    marginTop: 20,
                    backgroundColor: '#e2e8f0',
                    borderRadius: 20,
                  }}>
                  <Text center color={'red'}>
                    Ok
                  </Text>
                </TouchableOpacity>
              )}
            </Flex>
          ) : (
            <Flex column middle>
              {startDate && (
                <TouchableOpacity
                  onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}
                  style={{
                    width: '40%',
                    padding: 10,
                    marginTop: 20,
                    backgroundColor: '#e2e8f0',
                    borderRadius: 20,
                  }}>
                  <Text center color={'red'}>
                    Ok
                  </Text>
                </TouchableOpacity>
              )}
            </Flex>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CalenderPickers;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    width: '90%',

    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
