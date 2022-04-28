import { CardMedia, CardContent, Typography, CardActions, Grid, Card, Button } from "@mui/material";
import { Product } from "../../models/product";
import { btn, radiusShadow } from "../../layout/styles/muiStyles";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../api/agent";
import LoadingButton from "@mui/lab/LoadingButton";
import { useStoreContext } from "../../context/StoreContext";
import { formatCurrency } from "../../util/util";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {

  const [loading, setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  const handleAddItem = () => {
    setLoading(true);
    agent.Basket.addItem(product.id, 1)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card sx={radiusShadow}>
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
      <CardActions>
        <Grid container justifyContent='space-evenly' sx={{mb: 1}}>
          <LoadingButton 
            loading={loading} 
            onClick={handleAddItem}
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