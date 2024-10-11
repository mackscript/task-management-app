import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import BackIcon from '../../assets/back.svg';
import UserCircleIcon from '../../assets/user.svg';
import LinearGradient from 'react-native-linear-gradient';
import UI, {Button, Text} from '../common/UI';

const MainLayout = ({children, child, showHeader, sName, more, back}) => {
  const {theme} = useSelector(state => state.theme);
  const backScreen = () => {
    child.navigation.goBack();
  };

  console.log('child', children);
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
      style={{height: Dimensions.get('window').height}}>
      <SafeAreaView style={{flex: 1}}>
        {showHeader && (
          <View
            style={{
              height: 45,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              backgroundColor: theme.gradBG.dark,
            }}>
            <View>
              {back && (
                <TouchableOpacity
                  onPress={() => backScreen()}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <BackIcon width={20} height={14} />
                  <Text color={theme.colors.text.white}>Back</Text>
                </TouchableOpacity>
              )}
            </View>
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
                <View>
                  <UserCircleIcon width={24} height={24} fill={'#fff'} />
                </View>
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
