import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price,
        0,
      );
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price,
        0,
      );
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price,
        0,
      );
    },
  },
});

export const { addItem, removeItem, updateTotalPrice } = cartSlice.actions;

export default cartSlice.reducer;
