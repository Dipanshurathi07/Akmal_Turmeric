import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slice/ProductSlice';
import authReducer from './Slice/AuthSlice';
import adminReducer from './Slice/AdminSlice';
import contactReducer from './Slice/ContactSlice';
import cartReducer from './Slice/CartSlice';
import checkoutReducer from './Slice/CheckoutSlice';
import orderReducer from './Slice/OrderSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    admin: adminReducer,
    contact: contactReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
  },
});