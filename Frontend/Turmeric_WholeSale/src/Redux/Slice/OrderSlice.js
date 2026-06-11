import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/orders/create', orderData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { Message: 'An error occurred while creating order' }
      );
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/orders/user', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { Message: 'An error occurred while fetching user orders' }
      );
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { Message: 'An error occurred while fetching order' }
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/orders', {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { Message: 'An error occurred while fetching all orders' }
      );
    }
  }
);
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/orders/status/${orderId}`,
        { orderStatus },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          Message: 'An error occurred while updating order status',
        }
      );
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/orders/${orderId}`,
        {
          withCredentials: true,
        }
      );

      return {
        ...response.data,
        orderId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          Message: 'An error occurred while deleting order',
        }
      );
    }
  }
);

const initialState = {
  orders: [],
  allOrders: [],
  currentOrder: null,
  loading: false,
  error: null,
  message: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  clearCurrentOrder: (state) => {
    state.currentOrder = null;
    state.error = null;
    state.message = null;
  },

  clearOrderMessage: (state) => {
    state.error = null;
    state.message = null;
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload?.order || null;
        state.message = action.payload?.Message || 'Order created successfully';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload || null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(updateOrderStatus.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(updateOrderStatus.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload?.Message;

  const updatedOrder = action.payload.order;

  state.allOrders = state.allOrders.map((order) =>
    order._id === updatedOrder._id
      ? updatedOrder
      : order
  );

  if (
    state.currentOrder &&
    state.currentOrder._id === updatedOrder._id
  ) {
    state.currentOrder = updatedOrder;
  }
})

.addCase(updateOrderStatus.rejected, (state, action) => {
  state.loading = false;
  state.error =
    action.payload?.Message ||
    action.payload ||
    action.error?.message;
})

.addCase(deleteOrder.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(deleteOrder.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload?.Message;

  state.allOrders = state.allOrders.filter(
    (order) =>
      order._id !== action.payload.orderId
  );
})

.addCase(deleteOrder.rejected, (state, action) => {
  state.loading = false;
  state.error =
    action.payload?.Message ||
    action.payload ||
    action.error?.message;
})
  },
});

export const {clearCurrentOrder,clearOrderMessage} = orderSlice.actions;
export default orderSlice.reducer;
