import { createTheme } from '@mui/material/styles';

const theme = (paletteType: string) => createTheme({
  palette: {
    mode: paletteType === 'dark' ? 'dark' : 'light',
    primary: {
      main: '#0071e3',
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
            backgroundColor: paletteType === 'dark' ? '#515151' : '#adadad',
            borderRadius: '20px',
            minHeight: 24,
            border: `5px solid ${paletteType === 'dark' ? '#1e1e1e' : '#fff'}`,
          },
          '& *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: paletteType === 'dark' ? '#717171' : '#8d8d8d',
          },
          '& *::-webkit-scrollbar-thumb:active': {
            backgroundColor: paletteType === 'dark' ? '#717171' : '#8d8d8d',
          },
          '& *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: paletteType === 'dark' ? '#717171' : '#8d8d8d',
          },
          '& *::-webkit-scrollbar-corner': {
            backgroundColor: paletteType === 'dark' ? '#1e1e1e' : '#fff',
          },
        },
      },
    },
  },
});

export default theme;