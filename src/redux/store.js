import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducer/themeSlice'; // Your slice
import authSlicer from './reducer/authSlicer'; // Your slice
import otpVerifySlicer from './reducer/OtpVerifySlicer';
import profileSlice from './reducer/ProfileSlicer';
import userSlicer from './reducer/UserSlicer';
import taskSlicer from './reducer/TaskSlicer';
const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authSlicer,
    otp: otpVerifySlicer,
    profile: profileSlice,
    users: userSlicer,
    task: taskSlicer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});

export default store;
