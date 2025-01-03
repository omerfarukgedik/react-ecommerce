import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';

const store = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};

export default store;
