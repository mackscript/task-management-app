// src/config/theme.js

export const lightTheme = {
  mode: 'light',
  colors: {
    default: '#bfdbfe',
    primary: '#60a5fa', // Primary (Blue): #60a5fa – A soft medium blue.
    secondary: '#f0f9ff', //Secondary (Sky White Blue): #f0f9ff –
    background: '#FFFFFF', //Background (White): #FFFFFF
    surface: '#F6F6F6', //Surface (Light Gray): #F6F6F6
    error: '#B00020', //Error (Red): #B00020
    op: '#757575',
    opb: '#fff',
    backOp: '#afd2fc',
    text: {
      primary: '#0f111b', //Text Primary (Black): #0f111b
      secondary: '#757575', //Text Secondary (Gray):
      disabled: '#BDBDBD', //Text Disabled (Light Gray):
      hint: '#9E9E9E', //Text Hint (Grayish):
      inverse: '#FFFFFF', //Text Inverse (White)
    },
    inputBack: '#eff6ff',
    inputBorder: '#fff', //white
    border: '#a1a1aa', //#9ca3af light gray
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
    default: '#bfdbfe',
    primary: '#030303', // dark
    secondary: '#242424',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    op: '#757575',
    opb: '#030303',
    backOp: '#323232',
    text: {
      primary: '#fff',
      secondary: '#5c5c5c',
      disabled: '#757575',
      hint: '#A0A0A0',
      inverse: '#FFFFFF',
    },
    inputBorder: '#3f3f46', //white
    inputBack: '#262626',
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
  },
  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
};
