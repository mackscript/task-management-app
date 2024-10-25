import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axiosInstance from '../../helper/axiosInstance';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

const initialState = {
  isLogin: false, // To track if the user is logged in
  loginData: null,
  loginLoading: false,
  loginError: null,
  //
  signUpIsLoading: false,
  signUpStatus: null,

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
  reducers: {
    setLoginData: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.loginData = action.payload.loginData;
    },
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
        state.isLogin = false;
        state.loginError = '';
      })
      .addCase(submitLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.isLogin = true;
        state.loginError = '';
      })
      .addCase(submitLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.isLogin = false;
        state.loginError = action.payload.message; // Access the message properly
      })
      .addCase(submitSignUp.pending, state => {
        state.signUpIsLoading = true;
        state.signUpStatus = '';
        state.isLogin = false;
      })
      .addCase(submitSignUp.fulfilled, (state, action) => {
        state.signUpIsLoading = false;
        state.isLogin = true;
        state.signUpStatus = '';
      })
      .addCase(submitSignUp.rejected, (state, action) => {
        state.signUpIsLoading = false;
        state.isLogin = false;
        state.signUpStatus = action.payload.message; // Access the message properly
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
export const {logout, setLoginData} = AuthSlice.actions;
export default AuthSlice.reducer;
