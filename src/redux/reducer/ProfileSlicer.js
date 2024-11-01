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

  updateProfilePhotoLoading: false,
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
export const updateName = createAsyncThunk(
  'profile/updateName',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(`/profile/updateName`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);
export const updatePhNumber = createAsyncThunk(
  'profile/updatePhNumber',
  async (values, {rejectWithValue}) => {
    console.log('values', values);
    try {
      const {data} = await axiosInstance.post(
        `/profile/updatePhNumber`,
        values,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);
export const updatePosition = createAsyncThunk(
  'profile/updatePosition',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(
        `/profile/updatePosition`,
        values,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);
export const updateBio = createAsyncThunk(
  'profile/updateBio',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(`/profile/updateBio`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

export const updateProfilePhoto = createAsyncThunk(
  'profile/updateProfilePhoto',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(
        `/profile/updateProfilePhoto`,
        values,
      );
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
      })
      .addCase(updateName.rejected, (state, action) => {
        state.updateNameLoading = false;
      })
      .addCase(updateName.pending, (state, action) => {
        state.updateNameLoading = true;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.updateNameLoading = false;
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.updatePositionLoading = false;
      })
      .addCase(updatePosition.pending, (state, action) => {
        state.updatePositionLoading = true;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.updatePositionLoading = false;
      })
      .addCase(updatePhNumber.rejected, (state, action) => {
        state.updatePhoneNumberLoading = false;
      })
      .addCase(updatePhNumber.pending, (state, action) => {
        state.updatePhoneNumberLoading = true;
      })
      .addCase(updatePhNumber.fulfilled, (state, action) => {
        state.updatePhoneNumberLoading = false;
      })
      .addCase(updateBio.rejected, (state, action) => {
        state.updateBioLoading = false;
      })
      .addCase(updateBio.pending, (state, action) => {
        state.updateBioLoading = true;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.updateBioLoading = false;
      })
      .addCase(updateProfilePhoto.rejected, (state, action) => {
        state.updateProfilePhotoLoading = false;
      })
      .addCase(updateProfilePhoto.pending, (state, action) => {
        state.updateProfilePhotoLoading = true;
      })
      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        state.updateProfilePhotoLoading = false;
      });
  },
});
export default profileSlice.reducer;
