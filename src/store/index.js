import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'count',
  initialState: {
    value: 0,
  },
  reducers: {
    SET_COUNT: (state, { payload }) => {
      state.value += payload;
    },
  },
});

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  });
};

export const { SET_COUNT } = counterSlice.actions;
