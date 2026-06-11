import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/cart', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while fetching the cart' });
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/cart/add', { productId, quantity }, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while adding to cart' });
    }
  });

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart/remove/${productId}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while removing from cart' });
    }
  });

export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete('/cart/clear', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while clearing the cart' });
    }
  });

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cart/update/${productId}`, { quantity }, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while updating cart item quantity' });
    }
  });

const initialState = {
  cart: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  loading: false,
  error: null,
  message: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers : {
    clearCart : (state)=>{
      state.cart = { items: [], totalItems: 0, totalPrice: 0 };
      state.loading = false;
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload?.cart ?? action.payload ?? { items: [], totalItems: 0, totalPrice: 0 };
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.message = action.payload.Message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.message = action.payload.Message;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.message = action.payload.Message;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.message = action.payload.Message;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
   });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
