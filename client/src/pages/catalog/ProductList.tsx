import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => (
  <Grid container spacing={3}>
    {products.map(product => (
      <Grid item xs={3} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
);

export default ProductList;