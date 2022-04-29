import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { radiusShadow } from "../../layout/styles/muiStyles";
import { useAppSelector } from "../../store/store";
import { formatCurrency } from "../../util/util";

export default function BasketSummary() {
  const { basket } = useAppSelector(state => state.basket);
  const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  return (
    <TableContainer component={Paper} sx={{...radiusShadow, mt: 2}}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{formatCurrency(subtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Delivery fee*</TableCell>
            <TableCell align="right">{deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{formatCurrency(subtotal + deliveryFee)}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell colSpan={3}>
              <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}