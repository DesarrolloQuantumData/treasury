const twColors = require('tailwindcss/colors')

const businessColors = {
  primary: {
    DEFAULT: '#166D6B',
    50: ' #23B0AD',
    100: '#20A09D',
    200: '#1D918F',
    300: '#1A8482',
    400: '#187876',
    500: '#166D6B',
    600: '#146260',
    700: '#125856',
    800: '#104F4D',
    900: '#0E4745'
  },
  secondary: {
    DEFAULT: '#A2D033',
    50: '#EDF4D8',
    100: '#D9EBAB',
    200: '#C9E388',
    300: '#BBDC68',
    400: '#AED64C',
    500: '#A2D033',
    600: '#8FB92B',
    700: '#7EA326',
    800: '#6F8F21',
    900: '#627E1D'
  },
  primaryText: {
    DEFAULT: '#4E4E4E',
    50: '#A1A2A1',
    100: '#787878',
    200: '#6C6C6C',
    300: '#616161',
    400: '#575757',
    500: '#4E4E4E',
    600: '#454545',
    700: '#3D3D3D',
    800: '#363636',
    900: '#303030'
  },
  secondaryText: {
    DEFAULT: '#166D6B',
    50: '#25B7B5',
    100: '#21A5A3',
    200: '#1E9593',
    300: '#1B8684',
    400: '#187977',
    500: '#166D6B',
    600: '#14615F',
    700: '#125655',
    800: '#104D4C',
    900: '#0E4544'
  },
  primaryBackground: {
    DEFAULT: '#FFFFFF',
    100: '#FAFBFD',
    200: '#F9FBFB',
    500: '#FFFFFF',
    600: '#EFEFEF',
    700: '#C5C5C5',
    800: '#ADADAD',
    900: '#989898'
  },
  primaryBorder: {
    DEFAULT: '#DEE1ED'
  },

  primarySwitch: {
    DEFAULT: '#DFDFDF'
  },

  primaryNotification: {
    DEFAULT: '#EFEFEF'
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ...twColors, ...businessColors }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
