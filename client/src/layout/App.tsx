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
import { useAppDispatch } from "../store/store";
import { setBasket } from "../pages/basket/basketSlice";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useDarkThemeContext } from "../context/DarkThemeContext";
import Checkout from "../pages/checkout/Checkout";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";

const App = () => {
  const dispatch = useAppDispatch();
  const { darkMode, handleThemeChange } = useDarkThemeContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, [dispatch]);

  const currTheme = theme(darkMode ? 'dark' : 'light');

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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
