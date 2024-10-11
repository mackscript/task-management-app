// themeSlice.js
import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme} from '../../config/theme';

const initialState = {
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;

export const toggleTheme = () => async (dispatch, getState) => {
  const {theme} = getState().theme;
  const newTheme = theme.mode === 'light' ? darkTheme : lightTheme;
  dispatch(setTheme(newTheme));
  try {
    await AsyncStorage.setItem('appTheme', newTheme.mode);
  } catch (error) {
    console.error('Failed to save theme', error);
  }
};

export const loadTheme = () => async dispatch => {
  const savedTheme = await AsyncStorage.getItem('appTheme');
  dispatch(setTheme(savedTheme === 'dark' ? darkTheme : lightTheme));
};

export default themeSlice.reducer;
