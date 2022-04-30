import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../components/AppPagination";
import CheckboxButtons from "../../components/CheckboxButtons";
import RadioButtonGroup from "../../components/RadioButtonGroup";
import LoadingComponent from "../../layout/LoadingComponent";
import { radiusShadow } from "../../layout/styles/muiStyles";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageIndex, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: 'none', label: 'None' },
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
]

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, ages, productParams, metaData } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);
  
  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

   if (!filtersLoaded) return <LoadingComponent message='Loading products...' />



  return (
    <Grid container columnSpacing={4} rowSpacing={2}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2, ...radiusShadow }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2, ...radiusShadow }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2, ...radiusShadow }}>
          <CheckboxButtons
            label="Brand"
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2, ...radiusShadow }}>
          <CheckboxButtons
            label="Type"
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2, ...radiusShadow }}>
          <CheckboxButtons
            label="Age"
            items={ages}
            checked={productParams.ages}
            onChange={(items: string[]) => dispatch(setProductParams({ ages: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}></Grid>
      {metaData
        ? <AppPagination
          metaData={metaData}
          onPageChange={(page: number) => dispatch(setPageIndex({ pageIndex: page }))}
        />
        : ''
      }
    </Grid>
  );
};

export default Catalog;