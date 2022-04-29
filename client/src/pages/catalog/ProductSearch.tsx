import { styled, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setProductParams } from "./catalogSlice";

const SearchBox = styled(TextField)(() => ({
  '& fieldset': {
    borderRadius: '20px',
  },
}));

const ProductSearch = () => {
  const { productParams } = useAppSelector(state => state.catalog);
  const [search, setSearch] = useState(productParams.search);
  const dispatch = useAppDispatch();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(setProductParams({ search }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <SearchBox
        label='Search products'
        variant='outlined'
        fullWidth
        value={search || ''}
        onChange={(e: any) => setSearch(e.target.value)}
      />
    </form>
  )
}

export default ProductSearch;