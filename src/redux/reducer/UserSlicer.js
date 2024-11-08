import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

const initialState = {
  getUserLoading: false,
  getUsers: {
    data: [],
  },
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await axiosInstance.get(`/users/getAllUsers`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUsers.pending, state => {
        state.getUserLoading = true;
        state.getUsers = [];
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.getUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.getUserLoading = false;
        state.getUsers = [];
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
