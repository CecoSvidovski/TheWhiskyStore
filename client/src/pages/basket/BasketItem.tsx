import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableRow, TableCell, Box } from "@mui/material";
import { useState } from "react";
import agent from "../../api/agent";
import { useDarkThemeContext } from "../../context/DarkThemeContext";
import { useStoreContext } from "../../context/StoreContext";
import { BasketItem as BasketItemModel } from "../../models/basket";
import { formatCurrency } from "../../util/util";
import './BasketItem.css';
import { basketBtn, largeBtn, smallBtn } from "./muiStyles";

interface Props {
  item: BasketItemModel;
}

const BasketItem = ({ item }: Props) => {
  const { darkMode } = useDarkThemeContext();
  const { setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  const handleAddItem = (productId: number, name: string, quantity = 1) => {
    setStatus({loading: true, name});
    agent.Basket.addItem(productId, quantity)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name}));
  }

  const handleRemoveItem = (productId: number, name: string, quantity = 1) => {
    setStatus({loading: true, name});
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, name}));
  }

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
            loading={status.loading && status.name === 'rem' + item.productId }
            size="small"
            onClick={() => handleRemoveItem(item.productId, 'rem' + item.productId )}
            sx={{ ...basketBtn(darkMode), ...smallBtn }}
          >
            <Remove />
          </LoadingButton>
          <Box sx={{ minWidth: '34px', textAlign: 'center', fontWeight: 'bold' }}>
            {item.quantity}
          </Box>
          <LoadingButton
            loading={status.loading && status.name === 'add' + item.productId }
            size="small"
            onClick={() => handleAddItem(item.productId, 'add' + item.productId )}
            sx={{ ...basketBtn(darkMode), ...smallBtn }}
          >
            <Add />
          </LoadingButton>
        </Box>
      </TableCell>
      <TableCell align="right">{formatCurrency(item.price * item.quantity)}</TableCell>
      <TableCell align="right">
      <LoadingButton
          loading={status.loading && status.name === 'del' + item.productId }
          onClick={() => handleRemoveItem(item.productId, 'del' + item.productId , item.quantity)}
          sx={{ ...basketBtn(darkMode), ...largeBtn }}
        >
          <Delete />
        </LoadingButton>
      </TableCell>
    </TableRow>
  )
};

export default BasketItem