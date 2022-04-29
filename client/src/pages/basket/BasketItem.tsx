import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableRow, TableCell, Box } from "@mui/material";
import { useDarkThemeContext } from "../../context/DarkThemeContext";
import { BasketItem as BasketItemModel } from "../../models/basket";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { formatCurrency } from "../../util/util";
import './BasketItem.css';
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { basketBtn, largeBtn, smallBtn } from "./muiStyles";

interface Props {
  item: BasketItemModel;
}

const BasketItem = ({ item }: Props) => {
  const { darkMode } = useDarkThemeContext();
  const { status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Box display='flex' alignItems='center'>
          <img src={item.pictureUrl} alt={item.name} className={'basket-img'} />
          <span>{item.name}</span>
        </Box>
      </TableCell>
      <TableCell align="right">{formatCurrency(item.price)}</TableCell>
      <TableCell align="right" sx={{ pr: '11.75px' }}>
        <Box display='flex' alignItems='center' justifyContent='flex-end'>
          <LoadingButton
            loading={status === 'pendingRemoveItem' + item.productId}
            size="small"
            onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1}))}
            sx={{ ...basketBtn(darkMode), ...smallBtn }}
          >
            <Remove />
          </LoadingButton>
          <Box sx={{ minWidth: '34px', textAlign: 'center', fontWeight: 'bold' }}>
            {item.quantity}
          </Box>
          <LoadingButton
            loading={status === 'pendingAddItem' + item.productId}
            size="small"
            onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))}
            sx={{ ...basketBtn(darkMode), ...smallBtn }}
          >
            <Add />
          </LoadingButton>
        </Box>
      </TableCell>
      <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
      <TableCell align="right">
        <LoadingButton
          loading={status === 'pendingDeleteItem' + item.productId}
          onClick={() => dispatch(removeBasketItemAsync({productId: item.productId}))}
          sx={{ ...basketBtn(darkMode), ...largeBtn }}
        >
          <Delete />
        </LoadingButton>
      </TableCell>
    </TableRow>
  )
};

export default BasketItem