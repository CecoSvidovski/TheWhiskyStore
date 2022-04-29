import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => (
  <Grid container spacing={3} sx={{minWidth: '900px'}}>
    {products.map(product => (
      <Grid item xs={4} key={product.id}>
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
);

export default ProductList;