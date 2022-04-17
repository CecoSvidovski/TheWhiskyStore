import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../pages/catalog/Catalog";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://localhost:5001/api/products');
      const data = await res.json();
      setProducts(data);
    })()
  }, []);

  const addProduct = () => {};

  return (
    <>
      <h1>The Whisky Store</h1>
      <Catalog products={products} addProduct={addProduct} />
    </>
  );
};

export default App;
