import { useState, useEffect } from "react";
import agent from "../../api/agent";
import { Product } from "../../models/product"
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.getAll()
      .then(products => setProducts(products));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;