import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import catalogService from './catalogService';

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getCategories = createAsyncThunk(
  'catalog/getCategories',
  async (_, thunkAPI) => {
    try {
      return await catalogService.getCategories();
    } catch (error) {
      let message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default catalogSlice.reducer;

export const { reset } = catalogSlice.actions;
