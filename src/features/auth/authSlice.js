import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  errors: {},
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      let message = error.message || error.toString();

      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'object'
      ) {
        message = error.response.data;
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.error) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const clearErrors = () => ({
  type: 'auth/clearErrors',
});

export const clearGeneralErrorMessage = () => ({
  type: 'auth/clearGeneralErrorMessage',
});

// Takes in prop key and index of the error in the prop's error array
export const clearSpecificErrorMessage = (field, indexToRemove) => ({
  type: 'auth/clearSpecificErrorMessage',
  payload: { field, indexToRemove },
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.errors = {};
    },
    // Reducer to clear all errors
    clearErrors: (state) => {
      state.errors = {};
      state.isError = false;
      state.message = '';
    },
    // Reducer to clear the general error message
    clearGeneralErrorMessage: (state) => {
      state.message = '';
    },
    // Reducer to clear specific error messages
    clearSpecificErrorMessage: (state, action) => {
      const { field, indexToRemove } = action.payload;
      if (state.errors[field]) {
        state.errors[field].splice(indexToRemove, 1);
        // Remove the key if the error array is empty
        if (state.errors[field].length === 0) {
          delete state.errors[field];
        }
        // If there are no more errors left, update the isError state
        if (Object.keys(state.errors).length === 0) {
          state.isError = false;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        if (action.payload && typeof action.payload === 'object') {
          state.errors = action.payload;
        } else {
          // If it's just a string message, put it in the message field
          state.message = action.payload;
        }
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;

export const { reset } = authSlice.actions;
