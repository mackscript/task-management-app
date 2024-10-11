import React from 'react';
import {Text, View, Button} from 'react-native';

const Setting = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

export default Setting;
