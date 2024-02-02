import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import teachingService from './teachingService';

const initialState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  delete: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
};

export const getCourses = createAsyncThunk(
  'teaching/getCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await teachingService.getCourses(token);
    } catch (error) {
      let message = error.detail || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'teaching/deleteCourse',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      await teachingService.deleteCourse(token, id);
      return id;
    } catch (error) {
      let message = error.detail || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const teachingSlice = createSlice({
  name: 'teaching',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
      state.delete = {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
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
      .addCase(deleteCourse.pending, (state) => {
        state.delete.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.isSuccess = true;
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.isError = true;
        state.delete.message = action.payload;
      });
  },
});

export default teachingSlice.reducer;

export const { reset } = teachingSlice.actions;
