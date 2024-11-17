import React, {cloneElement, useEffect, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Flex, Text, Touch} from '../../components/common/UI';
import {useSelector} from 'react-redux';
import {Button, ScrollView, TouchableOpacity, View} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Task = props => {
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [items, setItems] = useState({
    '2024-11-11': [
      {
        name: 'Meeting 1',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-12': [
      {
        name: 'Meeting 2',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-13': [
      {
        name: 'Meeting 3',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-15': [
      {
        name: 'Meeting 5',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-16': [
      {
        name: 'Meeting 6',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
    '2024-11-17': [
      {
        name: 'Meeting 7',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
      {
        name: 'Meeting 7',
        data: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
      },
    ],
  });

  // useEffect(() => {
  //   loadItems(day);
  // }, [day]);

  const loadItems = day => {
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
              name: 'No Data Found',
              data: null,
            });
          }
        }
      }
      setItems(newItems);
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

  return (
    <MainLayout child={props} showHeader sName="" pf wl>
      <Div mb={70} style={{flex: 1}}>
        <Agenda
          key={theme.colors.primary}
          theme={{
            agendaKnobColor: '#768390',
            dayTextColor: '#fff',
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            // agendaKnobColor: 'blue',
            reservationsBackgroundColor: theme.colors.secondary,
            backgroundColor: 'red',
            calendarBackground: theme.colors.primary,
            textSectionTitleColor: theme.colors.text.secondary,
            selectedDayBackgroundColor: theme.colors.secondary,
            selectedDayTextColor: theme.colors.text.primary,
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
          renderItem={(items, isFirst) => {
            // const fontSize = isFirst ? 18 : 14;
            const color = isFirst ? '#FFF' : '#43515c';
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: items.data
                    ? theme.colors.primary
                    : 'transparent',
                  flex: 1,
                  borderRadius: 5,
                  padding: 10,
                  marginRight: 10,

                  marginTop: 20,
                  paddingBottom: 20,
                }}>
                <Text
                  size={18}
                  color={
                    items.data
                      ? theme.colors.text.primary
                      : theme.colors.text.secondary
                  }>
                  {items.name}
                </Text>
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
            top: 0,
            right: 0,
            backgroundColor: 'red',
            // width: 20,
            height: 20,
          }}
          title="Next Week"
          onPress={handleNextWeek}>
          <Text>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            backgroundColor: 'red',
            // width: 20,
            height: 20,
          }}
          title="Previous Week"
          onPress={handlePreviousWeek}>
          <Text>Previous</Text>
        </TouchableOpacity>
      </Div>
    </MainLayout>
  );
};

export default Task;
