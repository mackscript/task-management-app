import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import BackIcon from '../../assets/back.svg';
import Svg, {Path} from 'react-native-svg';
const MainLayout = ({child, showHeader, sName, more, back}) => {
  const {theme} = useSelector(state => state.theme);
  const backScreen = () => {
    child.navigation.goBack();
  };

  console.log('theme.colors.text.primary', theme.colors.text.primary);
  return (
    <View style={{flex: 1}}>
      <View style={{height: 55, backgroundColor: theme.colors.statusBar}} />
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
          <View>
            {back && (
              <TouchableOpacity
                onPress={() => backScreen()}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <BackIcon width={20} height={14} />
                <Text
                  style={{
                    color: theme.colors.text.primary,
                  }}>
                  Back
                </Text>
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
                <Text style={{color: theme.colors.text.primary}}>🤵🏻‍♂️</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View
        style={{
          flex: 1,
        }}>
        {child.children}
      </View>
    </View>
  );
};

export default MainLayout;
