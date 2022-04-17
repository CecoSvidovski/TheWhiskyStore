import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Product } from "../../models/product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {

  return (
    <Card>
      <CardMedia
        component="img"
        height="360"
        image={product.pictureUrl}
        alt="Whisky image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard;