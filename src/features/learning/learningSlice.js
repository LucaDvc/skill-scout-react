import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import learningService from './learningService';

const initialState = {
  courses: [],
  course: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  favourites: {
    courses: [],
    isLoading: false,
    isUpdating: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
};

export const getCourses = createAsyncThunk('learning/getCourses', async (_, thunkAPI) => {
  try {
    return await learningService.getCourses();
  } catch (error) {
    let message = error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getCourseById = createAsyncThunk(
  'learning/getCourseById',
  async (id, thunkAPI) => {
    try {
      return await learningService.getCourseById(id);
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

export const getFavouriteCourses = createAsyncThunk(
  'learning/getFavouriteCourses',
  async (_, thunkAPI) => {
    try {
      return await learningService.getFavouriteCourses();
    } catch (error) {
      let message = error.response.data.error || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCourseToFavourites = createAsyncThunk(
  'learning/addCourseToFavourites',
  async (courseId, thunkAPI) => {
    try {
      await learningService.updateFavouriteCourse({
        course_id: courseId,
        action: 'add',
      });
      return courseId;
    } catch (error) {
      let message = error.response.data.error || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeCourseFromFavourites = createAsyncThunk(
  'learning/removeCourseFromFavourites',
  async (courseId, thunkAPI) => {
    try {
      await learningService.updateFavouriteCourse({
        course_id: courseId,
        action: 'remove',
      });
      return courseId;
    } catch (error) {
      let message = error.response.data.error || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.isWishlistUpdating = false;
      state.courses = [];
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
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCourseById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
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
      .addCase(getFavouriteCourses.pending, (state) => {
        state.favourites.isLoading = true;
        state.favourites.isSuccess = false;
        state.favourites.isError = false;
      })
      .addCase(getFavouriteCourses.fulfilled, (state, action) => {
        state.favourites.isLoading = false;
        state.favourites.courses = action.payload;
      })
      .addCase(getFavouriteCourses.rejected, (state, action) => {
        state.favourites.isLoading = false;
        state.favourites.isError = true;
        state.favourites.message = action.payload;
      })
      .addCase(addCourseToFavourites.pending, (state) => {
        state.favourites.isUpdating = true;
        state.favourites.isSuccess = false;
        state.favourites.isError = false;
      })
      .addCase(addCourseToFavourites.fulfilled, (state, action) => {
        state.favourites.isUpdating = false;
        const course = state.courses.find((course) => course.id === action.payload);
        state.favourites.courses = [...state.favourites.courses, { ...course }];
        state.favourites.isSuccess = true;
      })
      .addCase(addCourseToFavourites.rejected, (state, action) => {
        state.favourites.isUpdating = false;
        state.favourites.isError = true;
        state.favourites.message = action.payload;
      })
      .addCase(removeCourseFromFavourites.pending, (state) => {
        state.favourites.isUpdating = true;
        state.favourites.isSuccess = false;
        state.favourites.isError = false;
      })
      .addCase(removeCourseFromFavourites.fulfilled, (state, action) => {
        state.favourites.isUpdating = false;
        state.favourites.isSuccess = true;
        state.favourites.courses = state.favourites.courses.filter(
          (course) => course.id !== action.payload
        );
      })
      .addCase(removeCourseFromFavourites.rejected, (state, action) => {
        state.favourites.isFavouriteUpdating = false;
        state.favourites.isError = true;
        state.favourites.message = action.payload;
      });
  },
});

export default learningSlice.reducer;

export const { reset, statusesReset } = learningSlice.actions;
