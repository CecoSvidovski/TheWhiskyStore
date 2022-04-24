import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Product } from "../../models/product";
import ProductTable from "./ProductTable";
import { productBtn } from "./muiStyles";

const ProductDetails = () => {
  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    agent.Catalog.getOne(parseInt(id))
      .then(data => setProduct(data))
      .catch(error => console.error(error.message, error.details))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (<h3>Loading...</h3>);
  if (!product) return (<h3>Product not found!</h3>);

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '100%', borderRadius: '25px'}} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3' sx={{m: 2}}>{product.name}</Typography>
        <Divider sx={{mt: 1, mb: 2}} />
        <Typography variant='h4' sx={{mt: 2, mb: 1, ml: 2}} color='secondary'>{'$' + (product.price / 100).toFixed(2)}</Typography>
        <ProductTable product={product} />
        <Button sx={{...productBtn, ml: 2, mt: 4}} variant='contained' size="medium">Add to cart</Button>
        <Button component={Link} to={`/catalog`} sx={{...productBtn, ml: 2, mt: 4}} variant='contained' size="medium">Back to catalog</Button>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;