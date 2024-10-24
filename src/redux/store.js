import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducer/themeSlice'; // Your slice
import authSlicer from './reducer/authSlicer'; // Your slice

const store = configureStore({
  reducer: {
    theme: themeReducer, // Add your reducers here
    auth: authSlicer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});

export default store;
