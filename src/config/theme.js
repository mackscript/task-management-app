// src/config/theme.js

export const lightTheme = {
  mode: 'light',
  colors: {
    primary: '#60a5fa', // blue
    secondary: '#f0f9ff', //sky white blue

    background: '#FFFFFF',
    surface: '#F6F6F6',
    error: '#B00020',
    text: {
      white: '#fff',
      primary: '#0f111b', // white
      secondary: '#757575',
      disabled: '#BDBDBD',
      hint: '#9E9E9E',
      inverse: '#FFFFFF',
    },
    border: '#fff',
  },
  typography: {
    fontFamily: {
      regular: 'OpenSans-Regular',
      bold: 'OpenSans-Bold',
    },
    fontSize: {
      small: 12,
      medium: 16,
      large: 20,
      xLarge: 24,
    },
  },
  gradBG: {
    dark: '#bfdbfe',
    midDark: '#eff6ff',
    midLight: '#242424',
    light: '#3d3d3d',
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#030303', // dark

    secondary: '#242424',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    text: {
      primary: '#fff',
      secondary: '#5c5c5c',
      disabled: '#757575',
      hint: '#A0A0A0',
      inverse: '#000000',
      white: '#fff',
    },
    border: '#44403c',
  },
  typography: {
    fontFamily: {
      regular: 'OpenSans-Regular',
      bold: 'OpenSans-Bold',
    },
    fontSize: {
      small: 12,
      medium: 16,
      large: 20,
      xLarge: 24,
    },
  },
  gradBG: {
    dark: '#171717',
    midDark: '#242424',
    midLight: '#242424',
    light: '#3d3d3d',
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
};
