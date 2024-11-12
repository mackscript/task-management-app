import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Div, Text} from '../../components/common/UI';
import {useSelector} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';

const Task = props => {
  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <MainLayout child={props} showHeader sName="" pf wl>
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2024-11-11': [{name: 'item 1 - any js object'}],
          '2024-11-12': [{name: 'item 2 - any js object', height: 80}],
          '2024-11-13': [],
          '2024-11-14': [
            {name: 'item 3 - any js object'},
            {name: 'any js object'},
          ],
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          console.log('day pressed');
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {
          console.log('day changed');
        }}
        // Initially selected day
        // selected={'2024-11-14'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2000-01-01'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'3000-01-01'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return (
            <View
              style={{backgroundColor: 'red', height: 20, width: 20}}></View>
          );
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          return (
            <View
              style={{backgroundColor: 'red', height: 20, width: 20}}></View>
          );
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return (
            <View
              style={{backgroundColor: 'red', height: 20, width: 20}}></View>
          );
        }}
        // Specify how agenda knob should look like
        renderKnob={() => {
          return (
            <View
              style={{backgroundColor: 'red', height: 20, width: 20}}></View>
          );
        }}
        // Override inner list with a custom implemented component
        renderList={listProps => {
          return (
            <View>
              {Object.entries(listProps.items).map((el, index) => (
                <View>
                  <Text>{JSON.stringify(el)}</Text>
                </View>
              ))}
            </View>
          );
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // Hide knob button. Default = false
        hideKnob={true}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={false}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed

        markedDates={{
          '2024-11-11': {selected: false, marked: true},
          '2024-11-12': {marked: true},
          '2024-11-14': {disabled: true},
        }}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
        // Agenda container style
        style={{}}
      />
    </MainLayout>
  );
};

export default Task;
