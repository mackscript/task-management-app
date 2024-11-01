import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

const initialState = {
  getProfileData: null,
  getProfileDataLoading: false,
  updateNameLoading: false,
  updatePhoneNumberLoading: false,
  updatePositionLoading: false,
  updateBioLoading: false,
};

export const fetchProfileData = createAsyncThunk(
  'profile/getProfile',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`/profile/getProfile`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.getProfileData = action.payload?.data;
        state.getProfileDataLoading = false;
      })
      .addCase(fetchProfileData.pending, (state, action) => {
        state.getProfileData = null;
        state.getProfileDataLoading = true;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.getProfileData = null;
        state.getProfileDataLoading = false;
      });
  },
});
export default profileSlice.reducer;
