import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {setAccessToken, clearAccessToken, getAccessToken } from '../../Utils/axiosInstance';
import axiosInstance from '../../Utils/axiosInstance';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while logging in' });
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/register', userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while registering' });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/forgot-password', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while sending forgot password email' });
    }
  }
);

export const sendRegistrationOtp = createAsyncThunk(
  'auth/sendRegistrationOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/send-registration-otp', { email });
     console.log("Response from verify-registration-otp:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while sending verification OTP' });
    }
  }
);

export const verifyRegistrationOtp = createAsyncThunk(
  'auth/verifyRegistrationOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/verify-registration-otp', { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while verifying registration OTP' });
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while verifying OTP' });
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/password-reset', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while resetting password' });
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/verify-email', { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while verifying email' });
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/me', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while fetching user data' });
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/logout', {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { Message: 'An error occurred while logging out' });
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  logout: (state) => {
    state.user = null;
    state.token = null;
    state.loading = false;
    state.error = null;
    state.message = null;

    clearAccessToken();
  },

  setToken: (state, action) => {
    state.token = action.payload;

    setAccessToken(action.payload);
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.token = action.payload?.AccessToken || null;
        if (action.payload?.AccessToken) {
          setAccessToken(action.payload.AccessToken);
        }
        state.message = action.payload?.Message || "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.token = action.payload?.AccessToken || null;
        if (action.payload?.AccessToken) {
          setAccessToken(action.payload.AccessToken);
        }
        state.message = action.payload?.Message || 'Registration successful';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(sendRegistrationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(sendRegistrationOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.Message || 'Verification OTP sent successfully';
      })
      .addCase(sendRegistrationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(verifyRegistrationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyRegistrationOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.Message || 'otp verified';
      })
      .addCase(verifyRegistrationOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.Message || 'OTP sent successfully';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.Message || 'OTP verified successfully';
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.Message || 'Password reset successfully';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.Message || 'Email verified successfully';
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        // backend returns user object directly
        state.user = action.payload || null;
        // sync token from in-memory axiosInstance
        state.token = getAccessToken() || state.token;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Message || action.payload || action.error?.message;
        state.user = null;
        state.token = null;
        clearAccessToken();
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
        state.message = action.payload?.Message || 'Logout successful';
        clearAccessToken();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload?.Message || action.payload || action.error?.message;
        clearAccessToken();
      });
  },
});

export const { logout, setToken} = authSlice.actions;
export default authSlice.reducer;
