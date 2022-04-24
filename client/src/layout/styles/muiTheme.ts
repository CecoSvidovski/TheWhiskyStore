import { createTheme } from "@mui/material/styles";

const theme = (paletteType: string) => createTheme({
  palette: {
    mode: paletteType === 'dark' ? 'dark' : 'light',
    primary: {
      main: '#1d1d1f',
    },
    secondary: {
      main: '#0071e3',
    },
    background: {
      default: paletteType === 'dark' ? '#121212' : '#f5f5f7',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'BlinkMacSystemFont',
    ].join(',')
  },
  
});

export default theme;