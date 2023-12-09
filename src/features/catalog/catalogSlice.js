import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import catalogService from './catalogService';

const initialState = {
  highestRatedCourses: [],
  popularCourses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getHighestRatedCourses = createAsyncThunk(
  'catalog/getHighestRatedCourses',
  async (_, thunkAPI) => {
    try {
      return await catalogService.getHighestRatedCourses();
    } catch (error) {
      let message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPopularCourses = createAsyncThunk(
  'catalog/getPopularCourses',
  async (_, thunkAPI) => {
    try {
      return await catalogService.getPopularCourses();
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
      state.highestRatedCourses = [];
      state.popularCourses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHighestRatedCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHighestRatedCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.highestRatedCourses = action.payload.results.slice(0, 6);
      })
      .addCase(getHighestRatedCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPopularCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.popularCourses = action.payload.results;
      })
      .addCase(getPopularCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default catalogSlice.reducer;

export const { reset } = catalogSlice.actions;
