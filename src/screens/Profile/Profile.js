import React from 'react';
import {Text, View, Button} from 'react-native';

const Profile = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'red'}}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
};

export default Profile;
