import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axiosInstance from '../../helper/axiosInstance';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

const initialState = {
  loginData: null,
  loginLoading: false,
  loginError: null,
};

export const submitLogin = createAsyncThunk(
  'user/login',
  async (values, {rejectWithValue}) => {
    console.log('values', values);
    try {
      const {data} = await axiosInstance.post(`/users/login`, values);
      console.log('data', data);
      return data;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue({message: error});
    }
  },
);

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
      .addCase(submitLogin.pending, state => {
        state.loginLoading = true;
        state.loginData = null;
        state.loginError = '';
      })
      .addCase(submitLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginData = action.payload;
        state.isLogin = true;
        state.loginError = '';
      })
      .addCase(submitLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginData = null;
        state.loginError = action.payload.message; // Access the message properly
      });
  },
});
export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer;
