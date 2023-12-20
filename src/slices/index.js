import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';
import cartReducer from './cartSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
});
