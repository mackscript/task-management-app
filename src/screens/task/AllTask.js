import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Flex, Text, Touch} from '../../components/common/UI';
import {useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Task = props => {
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(null);
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

  return (
    <MainLayout child={props} showHeader sName="" pf wl>
      <Div mb={70} style={{flex: 1}}>
        <Agenda
          theme={{
            agendaDayTextColor: 'yellow',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue',

            backgroundColor: 'red',
            calendarBackground: theme.colors.secondary,
            textSectionTitleColor: theme.colors.text.secondary,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: '#fff',
            todayTextColor: 'blue',
            textSectionTitleDisabledColor: theme.colors.text.secondary,

            dayTextColor: theme.colors.text.secondary,
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
          // hideKnob={true}
          onDayPress={day => {
            console.log('day pressed');
          }}
          enableSwipeMonths={true}
          // style={{backgroundColor: theme.colors.primary}}
          loadItemsForMonth={loadItems}
          rowHasChanged={rowHasChanged}
          showClosingKnob={true}
          renderEmptyDate={renderEmptyDate}
          selected={'2024-11-13'}
          items={items}
          markedDates={{
            '2024-11-11': {selected: false, marked: true},
            '2024-11-12': {marked: true},
            '2024-11-14': {disabled: true},
          }}
          renderItem={(items, isFirst) => {
            const fontSize = isFirst ? 16 : 14;
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
                <Text size={fontSize} color={theme.colors.primary}>
                  {items.name}
                </Text>
                <Text size={fontSize} color={color}>
                  {items.data}
                </Text>
              </TouchableOpacity>
            );
          }}
          showOnlySelectedDayItems
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
        />
      </Div>
    </MainLayout>
  );
};

export default Task;
