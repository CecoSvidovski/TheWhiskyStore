import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../pages/catalog/Catalog";
import Header from "./Header";
import { lightTheme, darkTheme } from "./theme";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const onSelectMode = (mode: string) => {
    setDarkMode(mode === 'dark')
    if (mode === 'dark')
      document.body.classList.add('dark-mode')
    else
      document.body.classList.remove('dark-mode')
  }

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => onSelectMode(e.matches ? 'dark' : 'light'));
  
    onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
      });
    }
  }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} theme={theme} />
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
