import { createSlice } from '@reduxjs/toolkit';
import useCurrency from '../hooks/useCurrency';

function calculateTotalPrice(items) {
  const total = items
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  return useCurrency({ price: total });
}

function saveLocalStorage(state) {
  localStorage.setItem('cart', JSON.stringify(state.items));
  state.totalPrice = calculateTotalPrice(state.items);
}

const items = JSON.parse(localStorage.getItem('cart')) || [];
const totalPrice = calculateTotalPrice(items);

const initialState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload.id);

      if (item) item.quantity += 1;
      else state.items.push(payload);
      saveLocalStorage(state);
    },
    increase: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload.id);
      item.quantity += 1;
      saveLocalStorage(state);
    },
    decrease: (state, { payload }) => {
      const item = state.items.find((item) => item.id === payload.id);
      if (item.quantity === 1)
        state.items = state.items.filter((item) => item.id !== payload.id);
      else item.quantity -= 1;

      saveLocalStorage(state);
    },
  },
});

export const { addItem, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
