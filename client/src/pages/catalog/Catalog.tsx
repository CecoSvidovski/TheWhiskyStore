import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { Product } from "../../models/product"
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    agent.Catalog.getAll()
      .then(products => setProducts(products))
      .catch(error => agent.handleError(error, navigate))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <LoadingComponent message='Loading products...' />

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;