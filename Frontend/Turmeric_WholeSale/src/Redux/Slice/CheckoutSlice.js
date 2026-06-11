import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const createCheckout = createAsyncThunk(
  'checkout/createCheckout',
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/checkout/create', checkoutData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { Message: 'An error occurred while creating checkout' }
      );
    }
  }
);

export const getUserCheckouts = createAsyncThunk(
  'checkout/getUserCheckouts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/checkout/user', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { Message: 'An error occurred while fetching checkouts' }
      );
    }
  }
);

export const getCheckoutById = createAsyncThunk(
  'checkout/getCheckoutById',
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/checkout/${checkoutId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { Message: 'An error occurred while fetching checkout' }
      );
    }
  }
);

const initialState = {
  checkouts: [],
  currentCheckout: null,
  loading: false,
  error: null,
  message: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    clearCurrentCheckout: (state) => {
      state.currentCheckout = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCheckout = action.payload?.checkout || null;
        state.message = action.payload?.Message || 'Checkout created successfully';
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(getUserCheckouts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getUserCheckouts.fulfilled, (state, action) => {
        state.loading = false;
        state.checkouts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getUserCheckouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(getCheckoutById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getCheckoutById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCheckout = action.payload || null;
      })
      .addCase(getCheckoutById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      });
  },
});

export const { clearCurrentCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
