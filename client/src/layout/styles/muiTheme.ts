import { createTheme } from '@mui/material/styles';

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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#6b6b6b #2b2b2b',
          '& *::-webkit-scrollbar': {
            width: '20px',
            borderRadius: '0px 8px 8px 0px',
            backgroundColor: paletteType === 'dark' ? '#1e1e1e' : '#fff',
            paddingTop: '20px',
            maxHeight: '58vh !important'
          },
          '& *::-webkit-scrollbar-thumb': {
            backgroundColor: '#757575',
            borderRadius: '20px',
            minHeight: 24,
            border: `5px solid ${paletteType === 'dark' ? '#1e1e1e' : '#fff'}`,
          },
          '& *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#959595',
          },
          '& *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#959595',
          },
          '& *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#959595',
          },
          '& *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
  },
});

export default theme;