import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#313132',
    },
    secondary: {
      main: '#0071e3',
    },
    background: {
      default: '#f5f5f7',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#313132',
    },
    secondary: {
      main: '#0071e3',
    },
  },
});
