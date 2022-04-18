import { useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Catalog from "../pages/catalog/Catalog";
import Header from "./Header";
import theme from "./theme";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const currTheme = theme(paletteType);

  const onSelectMode = (mode: string) => {
    setDarkMode(mode === 'dark')
    if (mode === 'dark')
      document.body.classList.add('dark-mode')
    else
      document.body.classList.remove('dark-mode')
  }

  useEffect(() => {
    const paletteMode = localStorage.getItem('theme');
    if(!paletteMode) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => onSelectMode(e.matches ? 'dark' : 'light'));
  
      onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    
      return () => {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
        });
      }
    }
    onSelectMode(paletteMode);
  }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', darkMode ? 'light' : 'dark')
  }

  return (
    <>
      <ThemeProvider theme={currTheme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} theme={currTheme} />
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
