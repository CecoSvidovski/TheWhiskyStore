import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { Product } from "../../models/product";

interface Props {
  product: Product,
}

const ProductTable = ({ product }: Props) => (
  <TableContainer>
    <Table sx={{fontSize: '26px'}}>
      <TableBody>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>{product.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Brand</TableCell>
          <TableCell>{product.brand}</TableCell>
        </TableRow>
        {product.age
          ? <TableRow>
              <TableCell>Age</TableCell>
              <TableCell>{product.age}</TableCell>
            </TableRow>
          : ''
        }
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>{product.description}</TableCell>
        </TableRow>
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell>Quantity In Stock</TableCell>
          <TableCell>{product.quantityInStock}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
)

export default ProductTable;