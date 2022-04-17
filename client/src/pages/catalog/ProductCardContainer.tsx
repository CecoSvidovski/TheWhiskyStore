import { CardMedia, CardContent, Typography, CardActions, Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductButton from "./ProductButton";
import ProductCard from "./ProductCard";

interface Props {
  product: Product;
}

const ProductCardContainer = ({ product }: Props) => {

  return (
    <ProductCard>
      <CardMedia
        component="img"
        image={product.pictureUrl}
        alt="Whisky image"
        title={product.name}
      />
      <CardContent>
        <Grid container justifyContent='space-between'>
          <Typography gutterBottom variant="h6">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6">
            {(product.price / 100).toFixed(2) + '$'}
          </Typography>
        </Grid>

        <Typography variant="subtitle2" color="text.secondary">
          {product.brand} / {product.type}
          {product.age
            ? ' / ' + product.age + ' Year Old'
            : ''
          }
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent='space-evenly' sx={{mb: 1}}>
          <ProductButton variant='contained' size="small">Add to cart</ProductButton>
          <ProductButton variant='contained' size="small">View</ProductButton>
        </Grid>
      </CardActions>
    </ProductCard>
  )
}

export default ProductCardContainer;