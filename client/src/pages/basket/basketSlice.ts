import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Basket } from "../../models/basket";

interface BasketState {
  basket: Basket | null;
  status: string;
};

const initialState: BasketState = {
  basket: null,
  status: 'init',
};

export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }>(
  'basket/addBasketItemAsync',
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity?: number }>(
  'basket/removeBasketItemAsync',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      return await agent.Basket.removeItem(productId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload
    },
  },
  extraReducers: (builder => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = 'pendingAddItem' + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = 'idle';
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      console.error('Error', action.payload);
      state.status = 'idle';
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      const productId = action.meta.arg.productId;
      if(!productId) return;
      if (!action.meta.arg.quantity) {
        state.status = 'pendingDeleteItem' + productId;
        return;
      }
      state.status = 'pendingRemoveItem' + productId;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = {
        productId: action.meta.arg.productId,
        quantity: action.meta.arg.quantity
      };
      const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
      if (itemIndex === -1 || itemIndex === undefined || !state.basket) return;
      const currQuantity = state.basket.items[itemIndex].quantity;

      state.basket.items[itemIndex].quantity -= quantity ?? currQuantity;
      if (state.basket.items[itemIndex].quantity === 0) {
        state.basket.items.splice(itemIndex, 1);
      }
      state.status = 'idle';
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.error('Error', action.payload);
      state.status = 'idle';
    });
  })
});

export const { setBasket } = basketSlice.actions;