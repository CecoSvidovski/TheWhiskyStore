import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { btn, radiusShadow } from "../../layout/styles/muiStyles";
import { useAppSelector } from "../../store/store";
import BasketItem from "./BasketItem";
import BasketSummary from "./BasketSummary";

const Basket = () => {
  const { basket } = useAppSelector(state => state.basket);

  if (!basket?.items || basket?.items.length < 1) 
    return <Typography variant='h3' textAlign={'center'}>Your basket is empty</Typography>

  return (
    <>
      <TableContainer component={Paper} sx={{...radiusShadow, maxHeight: '455px', minWidth: 600}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map(item => (
              <BasketItem key={item.productId} item={item}></BasketItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6} >
          <BasketSummary />
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            sx={{...btn, mt: 2}}
            size='large'
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Basket;