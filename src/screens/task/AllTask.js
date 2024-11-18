import React, {cloneElement, useCallback, useEffect, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Container, Div, Flex, Text, Touch} from '../../components/common/UI';
import {useDispatch, useSelector} from 'react-redux';
import {Button, ScrollView, TouchableOpacity, View} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {getAllTaskById} from '../../redux/reducer/TaskSlicer';
import moment from 'moment';

const Task = props => {
  const dispatch = useDispatch();
  const {getTaskByID, getTaskLoading} = useSelector(state => state.task);

  console.log('getTaskByID, getTaskLoading', getTaskByID, getTaskLoading);
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [items, setItems] = useState({});

  const loadItems = day => {
    console.log('day', day);
    const newItems = {...items};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!newItems[strTime]) {
          newItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            newItems[strTime].push({
              title: 'No Data Found',
              data: null,
            });
          }
        }
      }
      // setItems(newItems);
    }, 1000);
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const renderEmptyDate = () => {
    return (
      <View style={{}}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const handleNextWeek = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 7); // Move to next week
    setSelectedDate(currentDate.toISOString().split('T')[0]); // Update selected date
  };

  const handlePreviousWeek = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 7); // Move to previous week
    setSelectedDate(currentDate.toISOString().split('T')[0]); // Update selected date
  };

  useEffect(() => {
    const unsubscribeFocus = props.navigation.addListener('focus', () => {
      setSelectedDate(new Date());
      console.log('call');
      fetchApi(selectedDate);
    });
    return () => {
      unsubscribeFocus();
    };
  }, []);

  useEffect(() => {
    console.log('call ', Object.entries(getTaskByID).length);
    if (Object.entries(getTaskByID).length !== 0) {
      setItems(getTaskByID);
      cosnt = moment(selectedDate).format('YYYY-MM-DD');
    } else {
      setItems({
        [moment(selectedDate).format('YYYY-MM-DD')]: [
          {
            title: 'API Integration',
            desc: 'Successfully integrated the payment gateway API.',
            priority: 'high',
            image: [
              'https://example.com/image5.jpg',
              'https://example.com/image6.jpg',
            ],
            status: null,
          },
        ],
      });
    }
  }, [getTaskByID, selectedDate]);

  const fetchApi = date => {
    dispatch(getAllTaskById(moment(date).format('YYYY-MM-DD')));
  };
  return (
    <MainLayout child={props} showHeader sName="" wl pf>
      <Div style={{flex: 1}}>
        {/* <Container ml mr height={100}>
          <Text bold>Filter</Text>
        </Container> */}
        <Div style={{flex: 1}}>
          <Agenda
            key={theme.colors.primary}
            theme={{
              agendaKnobColor: '#768390',
              dayTextColor: '#768390',
              agendaDayTextColor: theme.colors.text.secondary,
              agendaDayNumColor: theme.colors.text.primary,
              agendaTodayColor: theme.colors.primary,
              // agendaKnobColor: 'blue',
              reservationsBackgroundColor: theme.colors.secondary,
              calendarBackground: theme.gradBG.dark,
              backgroundColor: 'red',

              textSectionTitleColor: '#43515c',
              selectedDayBackgroundColor: theme.colors.secondary,
              selectedDayTextColor: theme.colors.primary,
              todayTextColor: 'blue',
              textSectionTitleDisabledColor: theme.colors.text.secondary,

              textDisabledColor: 'gray',
              dotColor: '#00adf5',
              selectedDotColor: '#00adf5',

              monthTextColor: theme.colors.text.secondary,
              indicatorColor: theme.colors.primary,

              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            renderKnob={() => {
              return (
                <View style={{height: 14, padding: 4}}>
                  <View
                    style={{
                      height: '100%',
                      width: 40,
                      backgroundColor: '#DCDCDC',
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: '#DCDCDC',
                    }}
                  />
                </View>
              );
            }}
            onDayPress={day => {
              fetchApi(day.dateString);
              console.log('day pressed', day);
            }}
            // enableSwipeMonths={true}
            loadItemsForMonth={loadItems}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
            renderEmptyDate={renderEmptyDate}
            items={items}
            selected={selectedDate}
            markedDates={{
              '2024-11-11': {selected: false, marked: true},
              '2024-11-12': {marked: true},
              '2024-11-14': {disabled: true},
            }}
            // renderList={listProps => {
            //   return <View></View>;
            // }}
            renderItem={(items, isFirst) => {
              // const fontSize = isFirst ? 18 : 14;
              const color = '#43515c';
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: items.data
                      ? theme.gradBG.dark
                      : 'transparent',
                    flex: 1,
                    borderRadius: 12,
                    padding: 10,
                    marginTop: 20,
                    marginRight: 6,
                    paddingBottom: 20,
                    borderLeftWidth: 6,
                    borderColor: items.priorityColor,
                  }}>
                  <View
                    style={{
                      position: 'absolute',

                      backgroundColor: 'red',
                      zIndex: 3,
                      left: -50,
                    }}></View>
                  <Flex p={0} mb={4}>
                    <Text
                      size={16}
                      bold
                      color={
                        items.data
                          ? theme.colors.text.primary
                          : theme.colors.text.secondary
                      }>
                      {items.title}
                    </Text>
                    <Text
                      size={16}
                      ml={10}
                      pr={6}
                      br={6}
                      pl={6}
                      bg={theme.colors.primary}
                      color={'#fff'}>
                      #{items.priority}
                    </Text>
                  </Flex>
                  <Text size={16} color={color}>
                    {items.data}
                  </Text>
                </TouchableOpacity>
              );
            }}
            showOnlySelectedDayItems></Agenda>
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 1,
              top: -20,
              right: 0,
              // backgroundColor: 'red',
              // width: 20,
              height: 20,
            }}
            title="Next Week"
            onPress={handleNextWeek}>
            <Text>
              <Svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M9 2L4.83 7L9 12"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 1,
              top: -20,
              // backgroundColor: 'red',
              // width: 20,
              height: 20,
            }}
            title="Previous Week"
            onPress={handlePreviousWeek}>
            <Svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M9 2L4.83 7L9 12"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </Div>
      </Div>
    </MainLayout>
  );
};

export default Task;
