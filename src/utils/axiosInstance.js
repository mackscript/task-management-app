import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {replace} from './NavigationService'; // Import navigation functions
import {baseURL} from './config';

axios.interceptors.request.use(async config => {
  config.baseURL = baseURL;

  // Retrieve token from AsyncStorage
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers.authorization = `${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response) {
      // Server responded with a status outside the range of 2xx
    } else if (error.request) {
      // No response received (network error)
    } else {
      // Other error (could be due to setting up the request)
    }

    return Promise.reject(error);
  },
);
export default axios;
