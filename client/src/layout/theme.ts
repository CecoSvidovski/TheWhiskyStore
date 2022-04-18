import { createTheme } from "@mui/material/styles";

const theme = (paletteType: string) => createTheme({
  palette: {
    mode: paletteType === 'dark' ? 'dark' : 'light',
    primary: {
      main: '#252525',
    },
    secondary: {
      main: '#0071e3',
    },
    background: {
      default: paletteType === 'dark' ? '#121212' : '#f5f5f7',
    },
  },
});

export default theme;