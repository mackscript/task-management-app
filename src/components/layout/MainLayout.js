import React from 'react';
import {View} from 'react-native';

const MainLayout = props => {
  console.log('props', props);
  return (
    <View style={{flex: 1, borderWidth: 2, borderColor: 'green'}}>
      <View style={{height: 50, backgroundColor: 'blue'}}>
        {/* custom header   */}
      </View>
      <View
        style={{
          flex: 1,
        }}>
        {props.children}
      </View>
    </View>
  );
};

export default MainLayout;
