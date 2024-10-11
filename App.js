import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './src/screens/Profile/Profile';
import Setting from './src/screens/Settings/Setting';

const Stack = createNativeStackNavigator();
const App = () => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(colorScheme === 'dark' ? true : false);
  console.log('theme', theme);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
