import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axiosInstance from '../../helper/axiosInstance';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

const initialState = {
  isLogin: false, // To track if the user is logged in
  loginData: null,

  //checkToken
  checkTokenLoading: false,
};

export const checkToken = createAsyncThunk(
  'user/checkToken',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`/users/checkToken`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// New function to check authentication status
export const checkAuth = createAsyncThunk('user/checkAuth', async () => {
  const token = await AsyncStorage.getItem('token');
  const userInfo = await AsyncStorage.getItem('userInfo');
  const isLogin = await AsyncStorage.getItem('isLogin');

  if (token && isLogin === 'true') {
    return {token, userInfo, isLogin: true};
  } else {
    return {token: null, isLogin: false};
  }
});

const AuthSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: state => {
      AsyncStorage.removeItem('token'); // Clear token on logout
      AsyncStorage.setItem('isLogin', 'false'); // Update isLogin status
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkToken.pending, state => {
        state.checkTokenLoading = true;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.checkTokenLoading = false;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.checkTokenLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        // Update state based on AsyncStorage values
        state.isLogin = action.payload.isLogin;
        if (action.payload.isLogin) {
          state.loginData = {
            token: action.payload.token,
            userInfo: JSON.parse(action.payload.userInfo),
          }; // Store token if authenticated
        } else {
          state.loginData = null;
        }
      });
  },
});
export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer;
