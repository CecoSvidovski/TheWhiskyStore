import { List } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList = ({products}: Props) => {


  return (
    <List>
      {products.map(product => (
        <ProductCard product={product} />
      ))}
    </List>
  );
}

export default ProductList;