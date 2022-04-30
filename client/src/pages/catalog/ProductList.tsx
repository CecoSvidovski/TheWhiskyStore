import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import { useAppSelector } from "../../store/store";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector(state => state.catalog);

  return (
    <Grid container spacing={3} sx={{ minWidth: '900px' }}>
      {products.map(product => (
        <Grid item xs={4} key={product.id}>
          {!productsLoaded
            ? <ProductCardSkeleton />
            : <ProductCard product={product} />
          }
        </Grid>
      ))}
    </Grid>
  )
};

export default ProductList;