import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../pages/catalog/Catalog";
import Header from "./Header";
import appTheme from "./theme";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://localhost:5001/api/products');
      const data = await res.json();
      setProducts(data);
    })()
  }, []);

  const addProduct = () => { };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={appTheme}>
        <Header />
        <Container>
          <Catalog products={products} addProduct={addProduct} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
