/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 1,
  order: 'asc',
  sortBy: { id: 1, name: 'популярности', sort: 'rating' },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    toggleOrder: (state) => {
      state.order = state.order === 'asc' ? 'desc' : 'asc';
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setCategoryId,
  toggleOrder,
  setOrder,
  setSortBy,
} = filterSlice.actions;

export default filterSlice.reducer;

// filter, pizzas, cart
