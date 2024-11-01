import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {Container, Div, Flex, Text, Touch} from '../../components/common/UI';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import ProfileModal from './ProfileModal';
import {fetchProfileData} from '../../redux/reducer/ProfileSlicer';

const Profile = props => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {getProfileData, getProfileDataLoading} = useSelector(
    state => state.profile,
  );

  const {companyDetails} = useSelector(state => state.otp);
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  return (
    <MainLayout child={props} back showHeader sName="Profile" more>
      <ScrollView>
        {getProfileDataLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              height: '100%',
              width: '100%',
              left: 0,
              zIndex: 1,
            }}>
            <ActivityIndicator size="large" color={theme.colors.text.primary} />
          </View>
        )}
        <ProfileModal
          type={type}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <Div style={{flex: 1}}>
          <Container ml mt={30} mr>
            <Div
              alc
              ml="auto"
              mr={'auto'}
              width={140}
              bg={theme.mode == 'light' ? '#fff' : '#bfdbfe'}
              height={140}
              center
              br={100}>
              <Image
                style={{width: 130, borderRadius: 100, height: 130}}
                source={{
                  uri: 'https://avatars.githubusercontent.com/u/68142061?v=4',
                }}
              />
              <Touch
                activeOpacity={0.6}
                style={{
                  backgroundColor: theme.mode == 'light' ? '#fff' : '#bfdbfe',
                  position: 'absolute',
                  zIndex: 1,
                  top: 10,
                  right: 10,
                  padding: 2,
                  borderRadius: 6,
                }}>
                <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5337 2.3916C18.2236 2.08142 17.9559 1.81378 17.7193 1.60738C17.4702 1.39007 17.2019 1.1918 16.876 1.05679C16.1409 0.75231 15.3149 0.75231 14.5799 1.05679C14.2539 1.1918 13.9856 1.39007 13.7365 1.60738C13.4999 1.81378 13.2323 2.08141 12.9221 2.39159L6.93751 8.37615C6.52251 8.79078 6.20882 9.10419 5.97173 9.47695C5.77111 9.79238 5.61569 10.1344 5.51002 10.4929C5.38514 10.9167 5.35534 11.3591 5.31592 11.9444L5.1842 13.8876C5.17485 14.0247 5.16396 14.1845 5.16666 14.3246C5.16974 14.4838 5.18962 14.7203 5.30999 14.9677C5.45687 15.2697 5.70083 15.5137 6.00282 15.6606C6.25029 15.7809 6.48679 15.8008 6.64598 15.8039C6.78602 15.8066 6.94585 15.7957 7.08298 15.7863L9.02612 15.6546C9.61143 15.6152 10.0539 15.5854 10.4776 15.4605C10.8362 15.3549 11.1782 15.1994 11.4936 14.9988C11.8664 14.7617 12.1798 14.448 12.5944 14.033L18.579 8.04845C18.8891 7.73829 19.1568 7.47067 19.3632 7.23405C19.5805 6.98491 19.7788 6.71662 19.9138 6.39069C20.2182 5.65561 20.2182 4.82968 19.9138 4.09459C19.7788 3.76867 19.5805 3.50038 19.3632 3.25124C19.1568 3.01464 18.8892 2.74704 18.579 2.43691L18.5337 2.3916ZM16.1106 2.90455C16.1522 2.92179 16.2324 2.96437 16.4046 3.11458C16.5836 3.27072 16.803 3.48928 17.1421 3.82843C17.4813 4.16758 17.6998 4.3869 17.856 4.56591C18.0062 4.73813 18.0488 4.81835 18.066 4.85996C18.1675 5.10499 18.1675 5.3803 18.066 5.62533C18.0488 5.66694 18.0062 5.74716 17.856 5.91938C17.7482 6.04288 17.6108 6.18558 17.4245 6.37359L14.597 3.54602C14.785 3.35976 14.9277 3.22231 15.0512 3.11458C15.2234 2.96437 15.3036 2.92179 15.3452 2.90455C15.5903 2.80306 15.8656 2.80306 16.1106 2.90455ZM13.1823 4.9598L16.0107 7.78823L11.2465 12.5525C10.7366 13.0624 10.5842 13.207 10.4202 13.3112C10.2625 13.4116 10.0915 13.4893 9.91224 13.5421C9.72584 13.597 9.51672 13.6168 8.79731 13.6655L7.19649 13.7741L7.30502 12.1732C7.3538 11.4538 7.37351 11.2447 7.42845 11.0583C7.48128 10.879 7.55899 10.708 7.6593 10.5503C7.76359 10.3863 7.90816 10.234 8.41803 9.72409L13.1823 4.9598Z"
                    fill={theme.colors.primary}
                  />
                  <Path
                    d="M9.00549 1C7.61949 0.999994 6.51721 0.999988 5.62839 1.0738C4.71811 1.14939 3.94253 1.30755 3.23415 1.67552C2.1383 2.24478 1.24477 3.1383 0.67552 4.23416C0.307549 4.94253 0.149392 5.71811 0.0737977 6.6284C-1.45957e-05 7.51721 -8.05237e-06 8.61949 1.73096e-07 10.0055V11.9945C-8.05237e-06 13.3805 -1.45957e-05 14.4828 0.0737977 15.3716C0.149392 16.2819 0.307549 17.0575 0.67552 17.7659C1.24477 18.8617 2.1383 19.7552 3.23415 20.3245C3.94253 20.6925 4.71811 20.8506 5.62839 20.9262C6.5172 21 7.61946 21 9.00544 21H11.0438C12.4068 21 13.4909 21 14.3654 20.9286C15.261 20.8554 16.0247 20.7023 16.7239 20.346C17.8529 19.7708 18.7708 18.8529 19.346 17.7239C19.7023 17.0247 19.8554 16.261 19.9286 15.3654C20 14.4909 20 13.4069 20 12.0439V12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 13.4166 17.9992 14.419 17.9352 15.2026C17.8721 15.9745 17.7527 16.4457 17.564 16.816C17.1805 17.5686 16.5686 18.1805 15.816 18.564C15.4457 18.7527 14.9745 18.8721 14.2026 18.9352C13.419 18.9992 12.4166 19 11 19H9.05C7.60949 19 6.59025 18.9992 5.79391 18.9331C5.00955 18.8679 4.53142 18.7446 4.1561 18.5497C3.42553 18.1702 2.82985 17.5745 2.45035 16.8439C2.25538 16.4686 2.13208 15.9905 2.06694 15.2061C2.0008 14.4097 2 13.3905 2 11.95V10.05C2 8.60949 2.0008 7.59026 2.06694 6.79392C2.13208 6.00955 2.25538 5.53142 2.45035 5.15611C2.82985 4.42553 3.42553 3.82985 4.1561 3.45035C4.53142 3.25539 5.00955 3.13208 5.79391 3.06694C6.59025 3.00081 7.60949 3 9.05 3H10C10.5523 3 11 2.55229 11 2C11 1.44772 10.5523 1 10 1L9.00549 1Z"
                    fill={theme.colors.primary}
                  />
                </Svg>
              </Touch>
            </Div>
            <Container mt={10} width={'90%'} ml mr>
              <Touch
                onPress={() => {
                  setModalVisible(true);
                  setType('Name');
                }}
                mt={10}
                activeOpacity={0.6}
                bw={1}
                bc={theme.colors.border}
                br={10}
                p={8}>
                <Text color={theme.colors.text.secondary}>Name</Text>
                <Text mt={4} color={theme.colors.text.primary}>
                  {getProfileData?.firstName} {getProfileData?.lastName}
                </Text>
              </Touch>
              <Touch
                onPress={() => {
                  setModalVisible(true);
                  setType('Phone Number');
                }}
                mt={10}
                activeOpacity={0.6}
                bw={1}
                bc={theme.colors.border}
                br={10}
                p={8}>
                <Text color={theme.colors.text.secondary}>Phone Number</Text>
                <Text mt={4} color={theme.colors.text.primary}>
                  {getProfileData?.phNumber}
                </Text>
              </Touch>
              <Touch
                onPress={() => {
                  setModalVisible(true);
                  setType('Position');
                }}
                mt={10}
                activeOpacity={0.6}
                bw={1}
                bc={theme.colors.border}
                br={10}
                p={8}>
                <Text color={theme.colors.text.secondary}>
                  Title at {companyDetails?.companyName}
                </Text>
                <Text mt={4} color={theme.colors.text.primary}>
                  {getProfileData?.position}
                </Text>
              </Touch>

              <Touch
                onPress={() => {
                  setModalVisible(true);
                  setType('Bio');
                }}
                mt={10}
                activeOpacity={0.6}
                bw={1}
                bc={theme.colors.border}
                br={10}
                p={8}>
                <Text color={theme.colors.text.secondary}>
                  Short bio or current status
                </Text>
                <Text mt={4} color={theme.colors.text.primary}>
                  {getProfileData?.bio}
                </Text>
              </Touch>
            </Container>
            {/* <Container mt={10} ml mr width="100%">
            <Touch
              mt={10}
              activeOpacity={0.6}
              bw={1}
              bc={theme.colors.border}
              br={6}>
              <Flex middle>
                <Div width="80%">
                  <Text>x</Text>
                </Div>
                <Div width={'20%'}>
                  <Svg
                    style={{transform: [{rotate: '180deg'}]}}
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M9 2L4.83 7L9 12"
                      stroke="#000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                </Div>
              </Flex>
            </Touch>
          </Container> */}
          </Container>
        </Div>
      </ScrollView>
    </MainLayout>
  );
};
export default Profile;
