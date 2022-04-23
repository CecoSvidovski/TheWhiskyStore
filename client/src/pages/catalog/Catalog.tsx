import { useState, useEffect } from "react";
import * as productService from '../../services/productService'
import { Product } from "../../models/product"
import ProductList from "./ProductList";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getAll()
      .then(data => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

export default Catalog;