import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import agent from "../../api/agent";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { Product } from "../../models/product";
import ProductTable from "./ProductTable";
import { btn } from "../../layout/styles/muiStyles";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { formatCurrency } from "../../util/util";
import { useStoreContext } from "../../context/StoreContext";
import { LoadingButton } from "@mui/lab";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { basket, setBasket, removeItem } = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (!id) return;
    if (item) setQuantity(item.quantity);
    agent.Catalog.getOne(parseInt(id))
      .then(data => setProduct(data))
      .catch(error => agent.handleError(error, navigate))
      .finally(() => setLoading(false));
  }, [id, item, navigate]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  const handleUpdateCart = () => {
    if (!product) return;
    setSubmitting(true);

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket
        .addItem(product.id, updatedQuantity)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket
        .removeItem(product.id, updatedQuantity)
        .then(() => removeItem(product.id, updatedQuantity))
        .catch(error => console.log(error))
        .finally(() => setSubmitting(false))
    }
  }

  if (loading) return <LoadingComponent message="Loading product..." />;
  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%', borderRadius: '25px' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3' sx={{ m: 2 }}>{product.name}</Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Typography variant='h4' sx={{ mt: 2, mb: 1, ml: 2 }} color='secondary'>{formatCurrency(product.price)}</Typography>
        <ProductTable product={product} />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={item?.quantity === quantity || (!item && quantity === 0)}
              loading={submitting}
              onClick={handleUpdateCart}
              sx={{ height: '50.25px', ...btn }}
              size='large'
              variant='contained'
              fullWidth
            >
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;