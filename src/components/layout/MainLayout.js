import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../assets/icons/back.svg';
import UserCircleIcon from '../../assets/icons/user.svg';
import LinearGradient from 'react-native-linear-gradient';
import UI, {Button, Div, Text, Touch} from '../common/UI';
import {logout} from '../../redux/reducer/authSlicer';

const MainLayout = ({children, child, showHeader, sName, more, back}) => {
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const backScreen = () => {
    child.navigation.goBack();
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      locations={[0.3, 1, 1, 0.1]}
      end={{x: 1, y: 0.4}}
      colors={[
        theme.gradBG.midDark,
        theme.gradBG.dark,
        theme.gradBG.midDark,
        theme.gradBG.dark,
      ]}
      style={{flex: 1}}>
      <SafeAreaView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1, marginTop: 45}}>
        {showHeader && (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              backgroundColor: theme.colors.primary,
            }}>
            <Div width={40}>
              {back && (
                <TouchableOpacity
                  onPress={() => backScreen()}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <BackIcon width={20} height={14} />
                  <Text color={theme.colors.text.inverse}>Back</Text>
                </TouchableOpacity>
              )}
            </Div>
            <View>
              {sName && (
                <Text
                  style={{
                    color: theme.colors.text.primary,
                    textTransform: 'capitalize',
                  }}>
                  {sName}
                </Text>
              )}
            </View>

            <View>
              {more && (
                <Touch
                  onPress={() => {
                    dispatch(logout());
                    setTimeout(() => {
                      child.navigation.navigate('SignInScreen');
                    }, 1000);
                  }}>
                  <UserCircleIcon width={24} height={24} fill={'#fff'} />
                </Touch>
              )}
            </View>
          </View>
        )}
        <View style={{flex: 1}}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MainLayout;
