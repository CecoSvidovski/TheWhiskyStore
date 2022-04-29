import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Product, ProductParams } from "../../models/product";
import { RootState } from "../../store/store";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  ages: string[];
  productParams: ProductParams;
}

const productsAdapter = createEntityAdapter<Product>();

const getAxiosParams = (productParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append('pageIndex', productParams.pageIndex.toString());
  params.append('pageSize', productParams.pageSize.toString());
  params.append('orderBy', productParams.orderBy);

  if (productParams.search) params.append('search', productParams.search);
  if (productParams.brands) params.append('brands', productParams.brands.toString());
  if (productParams.types) params.append('types', productParams.types.toString());
  if (productParams.ages) params.append('ages', productParams.ages.toString());

  return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
  'catalog/fetchProductsAsync',
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
    try {
      return await agent.Catalog.getAll(params);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
  'catalog/fetchProductAsync',
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.getOne(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)

export const fetchFiltersAsync = createAsyncThunk(
  'catalog/fetchFilters',
  async (_, thunkAPI) => {
    try {
      return agent.Catalog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
)

const initParams = () => ({
  pageIndex: 1,
  pageSize: 9,
  orderBy: 'none',
})

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: 'init',
    brands: [],
    types: [],
    ages: [],
    productParams: initParams(),
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false;
      state.productParams = {...state.productParams, ...action.payload }
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    }
  },
  extraReducers: (builder => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = 'pendingFetchProducts';
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.productsLoaded = true;
      state.status = 'idle';
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.error('Error:', action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = 'pendingFetchProduct';
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.error('Error', action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = 'pendingFetchFilters';
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.ages = action.payload.ages;
      state.filtersLoaded = true;
      state.status = 'idle';
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      console.error('Error', action.payload);
      state.status = 'idle';
    });
  })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);

export const {setProductParams, resetProductParams} = catalogSlice.actions;