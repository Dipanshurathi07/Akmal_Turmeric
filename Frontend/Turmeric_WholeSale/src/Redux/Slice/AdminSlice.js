import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const fetchAllUsers = createAsyncThunk('admin/fetchAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/admin', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { Message: 'An error occurred while fetching users' });
  }
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/admin/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { Message: 'An error occurred while deleting user' });
  }
});

export const addUser = createAsyncThunk('admin/addUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/admin', userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { Message: 'An error occurred while adding user' });
  }
});

export const updateUser = createAsyncThunk('admin/updateUser', async ({ userId, userData }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/admin/${userId}`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || { Message: 'An error occurred while updating user' });
  }
});
const initialState = {
  users: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })

      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user._id !== action.meta.arg
        );
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;