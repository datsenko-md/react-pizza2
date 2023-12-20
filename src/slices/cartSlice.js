/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const getTotalPrice = (items) => items
  .reduce((acc, { count, price }) => acc + count * price, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = getTotalPrice(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.id);
      state.totalPrice = getTotalPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
