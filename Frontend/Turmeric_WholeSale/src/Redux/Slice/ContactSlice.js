import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const submitContactForm = createAsyncThunk(
  'contact/submitContactForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/contact/contact', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while submitting the contact form' });
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  message: null,
  contact: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.contact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.Message || 'Contact request submitted successfully';
        state.contact = action.payload?.contact || null;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
