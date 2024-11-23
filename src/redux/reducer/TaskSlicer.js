import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axiosInstance from '../../helper/axiosInstance';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native

const initialState = {
  isLoadingTaskCreate: false,

  getTaskByID: {},
  getTaskLoading: false,

  getTaskMarks: null,
  getMarksLoading: false,
};

export const submitTask = createAsyncThunk(
  'task/submitTask',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.post(`/task/create`, values);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

export const getAllTaskById = createAsyncThunk(
  'task/getTaskById',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `/task/getTaskById?date=${values}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

export const getAllMarkedTaskById = createAsyncThunk(
  'task/getAllMarkedTaskById',
  async (values, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(
        `/task/getTaskMarksByDate?date=${values}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(submitTask.pending, state => {
        state.isLoadingTaskCreate = true;
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.isLoadingTaskCreate = false;
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.isLoadingTaskCreate = false;
      })
      .addCase(getAllTaskById.pending, state => {
        state.getTaskLoading = true;
        state.getTaskByID = {};
      })
      .addCase(getAllTaskById.fulfilled, (state, action) => {
        state.getTaskLoading = false;
        state.getTaskByID = action.payload?.data;
      })
      .addCase(getAllTaskById.rejected, (state, action) => {
        state.getTaskLoading = false;
        state.getTaskByID = {};
      })
      .addCase(getAllMarkedTaskById.pending, state => {
        state.getMarksLoading = true;
        state.getTaskMarks = {};
      })
      .addCase(getAllMarkedTaskById.fulfilled, (state, action) => {
        state.getMarksLoading = false;
        state.getTaskMarks = action.payload?.data;
      })
      .addCase(getAllMarkedTaskById.rejected, (state, action) => {
        state.getMarksLoading = false;
        state.getTaskMarks = {};
      });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
