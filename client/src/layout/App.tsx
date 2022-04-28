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
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import Basket from "../pages/basket/Basket";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useDarkThemeContext } from "../context/DarkThemeContext";

const App = () => {
  const { darkMode, paletteType, handleThemeChange } = useDarkThemeContext();
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [setBasket]);

  const currTheme = theme(paletteType);

  if (loading) return <LoadingComponent message="Initialising app..." />

  return (
    <>
      <ThemeProvider theme={currTheme}>
        <ToastContainer
          position='bottom-right'
          hideProgressBar
          theme={darkMode ? 'dark' : 'light'}
        />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
