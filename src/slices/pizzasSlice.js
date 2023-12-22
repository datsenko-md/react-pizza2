/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getItemsUrl } from '../routes';

const initialState = {
  items: [],
  loadingStatus: 'idle', // loading | failed | no-content
  error: null,
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const {
      categoryId, sortBy, order, currentPage, searchValue, itemsLimit,
    } = state.filter;

    const response = await axios({
      method: 'get',
      url: getItemsUrl(),
      params: {
        category: categoryId === 1 ? null : categoryId,
        sortBy: sortBy.sort,
        order: order === 'asc' ? null : order,
        search: searchValue === '' ? null : searchValue,
        page: currentPage,
        limit: itemsLimit,
      },
    });
    return response.data;
  },
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loadingStatus = action.payload.length > 0 ? 'idle' : 'no-content';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const selectPizzas = (state) => state.pizzas;

export default pizzasSlice.reducer;
