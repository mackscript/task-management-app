import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducer/themeSlice'; // Your slice

const store = configureStore({
  reducer: {
    theme: themeReducer, // Add your reducers here
  },
});

export default store;
