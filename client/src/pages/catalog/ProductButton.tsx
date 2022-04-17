import { Button, ButtonProps, styled } from "@mui/material";

const ProductButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#0071e3'),
  backgroundColor: '#0071e3',
  borderRadius: '100px',
  '&:hover': {
    backgroundColor: '#0080ff',
  },
}));

export default ProductButton;