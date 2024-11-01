import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducer/themeSlice'; // Your slice
import authSlicer from './reducer/authSlicer'; // Your slice
import otpVerifySlicer from './reducer/OtpVerifySlicer';
import profileSlice from './reducer/ProfileSlicer';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authSlicer,
    otp: otpVerifySlicer,
    profile: profileSlice,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});

export default store;
