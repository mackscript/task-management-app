import React, {cloneElement, useCallback, useEffect, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Container, Div, Flex, Text, Touch} from '../../components/common/UI';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {
  getAllMarkedTaskById,
  getAllTaskById,
} from '../../redux/reducer/TaskSlicer';
import moment from 'moment';
import {width} from '../../utils/utils';

const Task = props => {
  const dispatch = useDispatch();
  const {getTaskByID, getTaskLoading, getMarksLoading} = useSelector(
    state => state.task,
  );

  const {theme} = useSelector(state => state.theme);
  const {userData} = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const loadItems = day => {
    fetchMarkedTask(day?.dateString);
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
    fetchApi(currentDate.toISOString().split('T')[0]);
  };

  const handlePreviousWeek = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 7); // Move to previous week
    // setSelectedDate(currentDate.toISOString().split('T')[0]); // Update selected date
    fetchApi(currentDate.toISOString().split('T')[0]);
  };

  useEffect(() => {
    const unsubscribeFocus = props.navigation.addListener('focus', () => {
      setSelectedDate(new Date());
      fetchApi(selectedDate);
      fetchMarkedTask(selectedDate);
    });
    return () => {
      unsubscribeFocus();
    };
  }, []);

  const fetchApi = async date => {
    setRefreshing(true);
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    await dispatch(getAllTaskById(moment(date).format('YYYY-MM-DD')))
      .unwrap()
      .then(res => {
        setRefreshing(false);
        if (Object.keys(res?.data).length === 0) {
          setItems({
            [moment(date).format('YYYY-MM-DD')]: [
              {title: null, decs: 'No Data Found'},
            ],
          });
        } else {
          setItems(res?.data);
        }
      })
      .catch(err => {
        setRefreshing(false);
        console.log('err', err);
        setItems({
          [moment(date).format('YYYY-MM-DD')]: [
            {title: null, decs: 'No Data Found'},
          ],
        });
      });
  };

  const fetchMarkedTask = async date => {
    await dispatch(getAllMarkedTaskById(moment(date).format('YYYY-MM-DD')))
      .unwrap()
      .then(res => {
        setMarkedDates(res?.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  console.log('items', items);

  const renderItems = (items, isFirst) => {
    // const fontSize = isFirst ? 18 : 14;
    const color = '#43515c';
    return (
      <Div>
        {items?.title == null ? (
          <Div mt={20}>
            <Text
              center
              size={16}
              bold
              color={
                items.title
                  ? theme.colors.text.primary
                  : theme.colors.text.secondary
              }>
              {items?.decs}
            </Text>
          </Div>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: theme.gradBG.dark,

              width: '95%',
              elevation: 8,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              marginTop: 10,
              // margin: 10,
              borderWidth: 1,
              borderColor: theme.colors.inputBorder,
              paddingBottom: 20,
              borderLeftWidth: 6,
              borderLeftColor:
                items?.priority == 'low'
                  ? '#bbf7d0'
                  : items?.priority == 'high'
                  ? '#fecaca'
                  : '#fed7aa',
            }}>
            <Div
              br={12}
              width={60}
              bg={
                items?.priority == 'low'
                  ? '#bbf7d0'
                  : items?.priority == 'high'
                  ? '#fecaca'
                  : '#fed7aa'
              }>
              <Text
                cp
                size={16}
                center
                color={
                  items?.priority == 'low'
                    ? '#22c55e'
                    : items?.priority == 'high'
                    ? '#ef4444'
                    : '#fb923c'
                }>
                {items?.priority}
              </Text>
            </Div>
            <Flex p={0} mb={4} mt={10} spaceb>
              <Div width={'90%'}>
                <Text
                  size={16}
                  bold
                  color={
                    items.title
                      ? theme.colors.text.primary
                      : theme.colors.text.secondary
                  }>
                  {items?.title} Lorem, ipsum dolor sit amet consectetur
                  adipisicing elit. Qui, ducimus!
                </Text>
              </Div>
              <Div width={'10%'}>
                <Svg
                  style={{transform: [{rotate: '180deg'}], marginLeft: 6}}
                  width="30"
                  height="30"
                  viewBox="0 0 17 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M5.91667 8L0.75 4.5M0.75 4.5L5.91667 1M0.75 4.5L16.25 4.5"
                    stroke={theme.colors.text.secondary}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </Div>
            </Flex>
            <Text line={1} size={16} color={color}>
              {items?.desc}
            </Text>
            <Flex p={0} mt={10} height={20}>
              {items?.users.map((el, index) => (
                <View
                  key={index}
                  style={{
                    position: 'absolute',
                    left: index * 15,
                    width: 32,
                    height: 32,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#fff',
                  }}>
                  {el ? (
                    <Image
                      style={{width: 30, height: 30, borderRadius: 50}}
                      source={{
                        uri: `data:image/jpeg;base64,${el}`,
                      }}
                    />
                  ) : (
                    <Image
                      style={{width: 30, height: 30, borderRadius: 50}}
                      source={{
                        uri: `https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1732382118~exp=1732385718~hmac=d42896a0f420e06671fc0e6f85f2d600ba10f6c969f811cfa5ddff2d5b0642cc&w=1800`,
                      }}
                    />
                  )}
                </View>
              ))}
              <Div></Div>
            </Flex>
          </TouchableOpacity>
        )}
      </Div>
    );
  };
  return (
    <MainLayout
      child={props}
      showHeader
      loading={getTaskLoading || getMarksLoading}
      sName="Today Task"
      back
      pf>
      {/* {getTaskLoading || getMarksLoading ? (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0)',
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={theme.colors.primary} />
          <Text center> loading..</Text>
        </View>
      ) : null} */}

      <Div style={{flex: 1}}>
        <Div style={{flex: 1}} mt={0}>
          <Flex middle spaceb p={0}>
            <TouchableOpacity
              style={{
                padding: 6,
                // backgroundColor: 'red',
                // width: 20,
                // height: 30,
              }}
              title="Previous Week"
              onPress={handlePreviousWeek}>
              <Text>Previous</Text>
              {/* <Svg
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
            </Svg> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 6,
                // backgroundColor: 'red',
                // width: 20,
              }}
              title="Next Week"
              onPress={handleNextWeek}>
              <Text>
                Next
                {/* <Svg
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
              </Svg> */}
              </Text>
            </TouchableOpacity>
          </Flex>
          <Agenda
            renderArrow="left"
            hideArrows={true}
            // enableSwipeMonths
            headerStyle={{backgroundColor: 'red'}}
            key={theme.colors.primary}
            renderDay={(day, item) => {
              return <View />;
            }}
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
              selectedDotColor: theme.colors.text.primary,
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
                      backgroundColor: '#fff',
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: '#fff',
                    }}
                  />
                </View>
              );
            }}
            onDayPress={day => {
              fetchApi(day.dateString);
            }}
            // enableSwipeMonths={true}
            loadItemsForMonth={loadItems}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
            renderEmptyDate={renderEmptyDate}
            items={items}
            selected={selectedDate}
            markedDates={markedDates}
            refreshing={refreshing}
            onRefresh={e => {
              fetchApi(selectedDate);
            }}
            // renderList={listProps => {
            //   return <View></View>;
            // }}
            renderItem={(items, isFirst) => renderItems(items, isFirst)}
            showOnlySelectedDayItems></Agenda>
        </Div>
      </Div>
    </MainLayout>
  );
};

export default Task;
