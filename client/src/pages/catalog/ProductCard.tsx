import { CardMedia, CardContent, Typography, CardActions, Grid, Card, Button } from "@mui/material";
import { Product } from "../../models/product";
import { btn, radiusShadow } from "../../layout/styles/muiStyles";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { formatCurrency } from "../../util/util";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{...radiusShadow, height: '100%', display: 'grid'}}>
      <CardMedia
        sx={{backgroundSize: 'contain'}}
        component="img"
        image={product.pictureUrl}
        alt="Whisky image"
        title={product.name}
      />
      <CardContent sx={{alignSelf: 'flex-start'}}>
        <Grid container justifyContent='space-between'>
          <Typography gutterBottom variant="h6">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6">
            {formatCurrency(product.price)}
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
      <CardActions sx={{alignSelf: 'flex-end'}}>
        <Grid container justifyContent='space-evenly' sx={{mb: 1}}>
          <LoadingButton 
            loading={status.includes('pendingAddItem' + product.id)} 
            onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
            sx={btn} 
            variant='contained' 
            size="medium"
          >
            Add to cart
          </LoadingButton>
          <Button 
            component={Link} 
            to={`/catalog/${product.id}`} 
            sx={btn} 
            variant='contained' 
            size="medium"
          >
            View
          </Button>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default ProductCard;