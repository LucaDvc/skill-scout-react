import { createTheme } from '@mui/material';

// Define the custom theme
const darkBlueTheme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Deep Blue
    },
    secondary: {
      main: '#4CAF50', // Vibrant Green
    },
    error: {
      main: '#FF5722', // Orange
    },
    info: {
      main: '#03A9F4', // Light Blue
    },
  },
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Montserrat, Arial, sans-serif',
    },
    // Add other custom styles as needed
  },
  components: {
    // You can add customizations to specific Material UI components here
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for buttons
          textTransform: 'none',
          // Add other styles as needed
        },
      },
    },
    // Add other components like MuiCard, MuiAppBar etc.
  },
});

export default darkBlueTheme;
