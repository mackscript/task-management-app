import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axiosInstance from '../../helper/axiosInstance';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

const initialState = {
  loginLoading: false,
  loginError: null,

  signUpIsLoading: false,
  signUpStatus: null,
  //verify

  //checkToken
  checkTokenLoading: false,
};

export const submitLogin = createAsyncThunk(
  'user/login',
  async (values, {rejectWithValue}) => {
    console.log('values', values);
    try {
      const {data} = await axiosInstance.post(`/users/login`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

export const submitSignUp = createAsyncThunk(
  'user/submitSignUp',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(`/users/signup`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

export const checkToken = createAsyncThunk(
  'user/checkToken',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`/users/checkToken`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

const AuthSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitLogin.pending, state => {
        state.loginLoading = true;

        state.loginError = '';
      })
      .addCase(submitLogin.fulfilled, (state, action) => {
        state.loginLoading = false;

        state.loginError = '';
      })
      .addCase(submitLogin.rejected, (state, action) => {
        state.loginLoading = false;

        state.loginError = action.payload.message;
      })
      .addCase(submitSignUp.pending, state => {
        state.signUpIsLoading = true;
        state.signUpStatus = '';
      })
      .addCase(submitSignUp.fulfilled, (state, action) => {
        state.signUpIsLoading = false;

        state.signUpStatus = '';
      })
      .addCase(submitSignUp.rejected, (state, action) => {
        state.signUpIsLoading = false;
        state.signUpStatus = action.payload.message;
      })
      .addCase(checkToken.pending, state => {
        state.checkTokenLoading = true;
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        state.checkTokenLoading = false;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.checkTokenLoading = false;
      });
  },
});

export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
