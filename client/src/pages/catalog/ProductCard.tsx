import { Card, CardProps, styled } from "@mui/material";

const ProductCard = styled(Card)<CardProps>(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.03)',
}));

export default ProductCard;