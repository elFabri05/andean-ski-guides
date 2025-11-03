'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D2691E', // Burnt orange
      light: '#E8965E',
      dark: '#8B4513',
      contrastText: '#fff',
    },
    secondary: {
      main: '#CD853F', // Peru/Golden brown
      light: '#DEB887',
      dark: '#8B6914',
      contrastText: '#fff',
    },
    background: {
      default: '#FFF8DC', // Cornsilk - warm cream
      paper: '#FAEBD7', // Antique white
    },
    text: {
      primary: '#3E2723', // Dark brown
      secondary: '#5D4037',
    },
    error: {
      main: '#C62828',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      color: '#3E2723',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#3E2723',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#3E2723',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme;
