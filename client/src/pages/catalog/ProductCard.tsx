import { CardMedia, CardContent, Typography, CardActions, Grid, Card, Button } from "@mui/material";
import { Product } from "../../models/product";
import { productBtn, productCard } from "./muiStyles";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {

  return (
    <Card sx={productCard}>
      <CardMedia
        sx={{backgroundSize: 'contain'}}
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
            {'$' + (product.price / 100).toFixed(2)}
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
          <Button sx={productBtn} variant='contained' size="medium">Add to cart</Button>
          <Button component={Link} to={`/catalog/${product.id}`} sx={productBtn} variant='contained' size="medium">View</Button>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ProductCard;