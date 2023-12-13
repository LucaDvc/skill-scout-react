import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import catalogService from './catalogService';

const initialState = {
  recommendedCourses: {
    highestRatedCourses: [],
    popularCourses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  filteredCourses: [],
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

export const getCoursesByFilter = createAsyncThunk(
  'catalog/getByFilter',
  async (params, thunkAPI) => {
    try {
      return await catalogService.getCoursesByFilter(params);
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
      state.filteredCourses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHighestRatedCourses.pending, (state) => {
        state.recommendedCourses.isLoading = true;
      })
      .addCase(getHighestRatedCourses.fulfilled, (state, action) => {
        state.recommendedCourses.isLoading = false;
        state.recommendedCourses.isSuccess = true;
        state.recommendedCourses.highestRatedCourses =
          action.payload.results.slice(0, 5);
      })
      .addCase(getHighestRatedCourses.rejected, (state, action) => {
        state.recommendedCourses.isLoading = false;
        state.recommendedCourses.isError = true;
        state.recommendedCourses.message = action.payload;
      })
      .addCase(getPopularCourses.pending, (state) => {
        state.recommendedCourses.isLoading = true;
      })
      .addCase(getPopularCourses.fulfilled, (state, action) => {
        state.recommendedCourses.isLoading = false;
        state.recommendedCourses.isSuccess = true;
        state.recommendedCourses.popularCourses = action.payload.results.slice(
          0,
          5
        );
      })
      .addCase(getPopularCourses.rejected, (state, action) => {
        state.recommendedCourses.isLoading = false;
        state.recommendedCourses.isError = true;
        state.recommendedCourses.message = action.payload;
      })
      .addCase(getCoursesByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoursesByFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.filteredCourses = action.payload.results;
      })
      .addCase(getCoursesByFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default catalogSlice.reducer;

export const { reset } = catalogSlice.actions;
