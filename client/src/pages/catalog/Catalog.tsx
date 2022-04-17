import { useState, useEffect } from "react";
import { Product } from "../../models/product"
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://localhost:5001/api/products');
      const data = await res.json();
      setProducts(data);
    })()
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;