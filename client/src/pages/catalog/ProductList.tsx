import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCardContainer from "./ProductCardContainer";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {


  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={3} key={product.id}>
          <ProductCardContainer product={product}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;