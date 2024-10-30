import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axiosInstance from '../../helper/axiosInstance';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

const initialState = {
  isLogin: false, // To track if the user is logged in
  userData: null,

  //verify
  otpVerify: false,
  otpVerifyIsLoading: false,

  //Create Company Name
  companyDetails: '',
  isLoadingGetCompanyName: '',

  isLoadingCreateCompanyDetails: '',
};

export const otpVerify = createAsyncThunk(
  'otp/otpVerify',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(`/users/verify-otp`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);
export const submitCreateCompany = createAsyncThunk(
  'company/create',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(`/company/create`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

const AuthSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.userData = action.payload.userData;
    },
    logout: state => {
      AsyncStorage.removeItem('token');
      AsyncStorage.setItem('isLogin', 'false');
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(otpVerify.pending, state => {
        state.otpVerifyIsLoading = true;
        state.otpVerify = false;
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.otpVerifyIsLoading = false;
        state.otpVerify = true;
      })
      .addCase(otpVerify.rejected, (state, action) => {
        state.otpVerifyIsLoading = false;
        state.otpVerify = false;
      })
      .addCase(submitCreateCompany.pending, state => {
        state.isLoadingCreateCompanyDetails = true;
        state.companyDetails = null;
      })
      .addCase(submitCreateCompany.fulfilled, (state, action) => {
        state.isLoadingCreateCompanyDetails = false;
        state.companyDetails = action.payload.data;
      })
      .addCase(submitCreateCompany.rejected, (state, action) => {
        state.isLoadingCreateCompanyDetails = false;
        state.companyDetails = null;
      });
  },
});
export const {setLoginData, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
