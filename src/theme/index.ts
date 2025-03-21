import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF4E16',
      light: '#FF8C42',
      dark: '#FF2400',
    },
    secondary: {
      main: '#FF2992',
      light: '#FF5CAF',
      dark: '#C21B6F',
    },
    background: {
      default: '#13111C',
      paper: '#1E1A2A',
    },
    text: {
      primary: '#FF6B6B',
      secondary: 'rgba(255, 107, 107, 0.7)',
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;