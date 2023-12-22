/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 1,
  order: 'asc',
  sortBy: { id: 1, name: 'популярности', sort: 'rating' },
  currentPage: 1,
  searchValue: '',
  itemsLimit: 4,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.order = action.payload.order;
      state.sortBy = action.payload.sort;
      state.searchValue = action.payload.search;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const {
  setCategoryId,
  toggleOrder,
  setOrder,
  setSortBy,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
