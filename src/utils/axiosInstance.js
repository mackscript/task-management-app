import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {replace} from './NavigationService'; // Import navigation functions
import {baseURL} from './config';

// Create an Axios instance
axios.interceptors.request.use(config => {
  config.baseURL = baseURL;

  // const token = localStorage.getItem("_t");

  // if (token) {
  //   config.headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  // } else {
  //   axios.defaults.headers.common.Authorization &&
  //     delete axios.defaults.headers.common.Authorization;
  //   config.headers = axios.defaults.headers;
  // }
  return config;
});
axios.interceptors.response.use(
  response => response,
  async error => {
    return Promise.reject(error);
  },
);

export default axios;
