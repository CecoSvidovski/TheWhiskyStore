import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import theme from "./styles/muiTheme";
import Header from "./Header";
import Home from "../pages/home/Home";
import Catalog from "../pages/catalog/Catalog";
import ProductDetails from "../pages/catalog/ProductDetails";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import 'react-toastify/dist/ReactToastify.css';

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
    if (!paletteMode) {
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
        <ToastContainer position='bottom-right' hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
