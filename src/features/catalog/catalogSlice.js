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
  tags: {
    list: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  filteredCourses: [],
  resultsCount: 0,
  course: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isWishlistUpdating: false,
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

export const getTags = createAsyncThunk(
  'catalog/getTags',
  async (_, thunkAPI) => {
    try {
      return await catalogService.getTags();
    } catch (error) {
      let message = error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCourseById = createAsyncThunk(
  'catalog/getCourseById',
  async (id, thunkAPI) => {
    try {
      return await catalogService.getCourseById(id);
    } catch (error) {
      let message;
      if (error.response.status === 404) {
        message = 'Not found';
      } else {
        message = error.message || error.toString();
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const wishlistCourse = createAsyncThunk(
  'catalog/wishlistCourse',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await catalogService.wishlistCourse(id, token);
    } catch (error) {
      let message;
      if (error.response.status === 404) {
        message = 'Not found';
      } else {
        message = error.message || error.toString();
      }

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
    statusesReset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
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
        state.resultsCount = action.payload.count;
      })
      .addCase(getCoursesByFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTags.pending, (state) => {
        state.tags.isLoading = true;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.tags.isLoading = false;
        state.tags.isSuccess = true;
        state.tags.list = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.tags.isLoading = false;
        state.tags.isError = true;
        state.tags.message = action.payload;
      })
      .addCase(getCourseById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(wishlistCourse.pending, (state) => {
        state.isWishlistUpdating = true;
      })
      .addCase(wishlistCourse.fulfilled, (state) => {
        state.isWishlistUpdating = false;
      })
      .addCase(wishlistCourse.rejected, (state) => {
        state.isWishlistUpdating = false;
      });
  },
});

export default catalogSlice.reducer;

export const { reset, statusesReset } = catalogSlice.actions;
