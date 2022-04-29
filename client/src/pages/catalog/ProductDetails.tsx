import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import ProductTable from "./ProductTable";
import { btn } from "../../layout/styles/muiStyles";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { formatCurrency } from "../../util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productSelectors.selectById(state, id!))
  const { status: productStatus } = useAppSelector(state => state.catalog);
  const [quantity, setQuantity] = useState(1);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (!id) return;
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, product, dispatch]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  const handleUpdateCart = () => {
    if (!product) return;
    if (quantity < 0) return;

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
    }
  }

  if (productStatus.includes('pending') || productStatus === 'init')
    return <LoadingComponent message="Loading product..." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6} sx={{ minWidth: '800px' }}>
      <Grid item xs={5}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%', borderRadius: '25px' }} />
      </Grid>
      <Grid item xs={7}>
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
              loading={status.includes('pending')}
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