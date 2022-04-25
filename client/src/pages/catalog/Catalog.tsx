import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import { Product } from "../../models/product"
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    agent.Catalog.getAll()
      .then(products => setProducts(products))
      .catch(error => agent.handleError(error, navigate));
  }, [navigate]);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;