import React, {cloneElement, useCallback, useEffect, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Container, Div, Flex, Text, Touch} from '../../components/common/UI';
import {useSelector} from 'react-redux';
import {Button, ScrollView, TouchableOpacity, View} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect} from '@react-navigation/native';

const Task = props => {
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [items, setItems] = useState({
    '2024-11-11': [
      {
        priority: '',
        priorityColor: 'blue',
        title: 'Meeting 1',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-12': [
      {
        title: 'Meeting 2',
        priority: 'high',
        priorityColor: 'blue',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
      {
        title: 'Meeting 2',
        priority: 'low',
        priorityColor: 'red',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
      {
        title: 'Meeting 2',
        priority: 'medium',
        priorityColor: 'green',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
      {
        title: 'Meeting 2',
        priority: '',
        priorityColor: 'yellow',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
      {
        title: 'Meeting 2',
        priority: '',
        priorityColor: 'red',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-13': [
      {
        title: 'Meeting 3',
        priority: '',
        priorityColor: 'red',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-15': [
      {
        title: 'Meeting 5',
        priority: '',
        priorityColor: 'red',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-16': [
      {
        title: 'Meeting 6',
        priority: '',
        priorityColor: 'red',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-17': [
      {
        title: 'Meeting 7',
        priority: 'medium',
        priorityColor: 'red',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
  });

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
    });
    return () => {
      unsubscribeFocus();
    };
  }, []);

  return (
    <MainLayout child={props} showHeader sName="" wl pf>
      <Div mb={70} style={{flex: 1}}>
        <Container ml mr height={100}>
          <Text bold>Filter</Text>
        </Container>
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
              console.log('day pressed');
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
              backgroundColor: 'red',
              // width: 20,
              height: 20,
            }}
            title="Next Week"
            onPress={handleNextWeek}>
            <Text> ">" </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 1,
              top: -20,
              backgroundColor: 'red',
              // width: 20,
              height: 20,
            }}
            title="Previous Week"
            onPress={handlePreviousWeek}>
            <Text> ">" </Text>
          </TouchableOpacity>
        </Div>
      </Div>
    </MainLayout>
  );
};

export default Task;
