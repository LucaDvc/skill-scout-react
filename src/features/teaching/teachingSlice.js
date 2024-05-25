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
  create: {
    course: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  edit: {
    course: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
};

export const getCourses = createAsyncThunk('teaching/getCourses', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().users.accessToken;
    return await teachingService.getCourses(token);
  } catch (error) {
    let message = error.detail || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteCourse = createAsyncThunk(
  'teaching/deleteCourse',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      await teachingService.deleteCourse(token, id);
      return id;
    } catch (error) {
      let message = 'Unable to delete course. Please try again.';

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCourse = createAsyncThunk(
  'teaching/createCourse',
  async ({ course, isImageUrl }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await teachingService.createCourse(token, course, isImageUrl);
    } catch (error) {
      let message = 'Unable to create course. Please try again.';

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCourseById = createAsyncThunk(
  'teaching/getCourseById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await teachingService.getCourseById(token, id);
    } catch (error) {
      let message = 'Unable to get course. Please try again.';

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'teaching/updateCourse',
  async ({ id, updatedCourse }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await teachingService.updateCourse(token, id, updatedCourse);
    } catch (error) {
      let message = 'Unable to update course. Please try again.';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateLesson = createAsyncThunk(
  'teaching/updateLesson',
  async ({ id, lesson }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      return await teachingService.updateLesson(token, id, lesson);
    } catch (error) {
      let message = 'Unable to update lesson. Please try again.';
      if (error.response.status === 500) {
        message = 'Internal server error. Please try again later.';
      } else if (error.response.status === 400) {
        message =
          'Invalid data. Please fill in all the required fields for all lesson steps.';
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'teaching/deleteLesson',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.accessToken;
      await teachingService.deleteLesson(token, id);
      return id;
    } catch (error) {
      let message = 'Unable to delete lesson. Please try again.';
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
      state.create = {
        course: state.create.course,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      };
      state.edit = {
        course: state.edit.course,
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
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.isError = true;
        state.delete.message = action.payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.create.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.create.isLoading = false;
        state.create.isSuccess = true;
        state.create.course = action.payload;
        state.edit.course = action.payload;
        state.courses = [...state.courses, action.payload];
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.create.isLoading = false;
        state.create.isError = true;
        state.create.message = action.payload;
      })
      .addCase(getCourseById.pending, (state) => {
        state.edit.isLoading = true;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.edit.isLoading = false;
        state.edit.isSuccess = true;
        state.edit.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.edit.isLoading = false;
        state.edit.isError = true;
        state.edit.message = action.payload;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.edit.isLoading = false;
        state.edit.isSuccess = true;
        state.edit.course = action.payload;
        state.courses = state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.edit.isLoading = false;
        state.edit.isError = true;
        state.edit.message = action.payload;
      })
      .addCase(updateLesson.pending, (state, action) => {
        state.edit.isLoading = true;
        state.edit.isSuccess = false;
        state.edit.isError = false;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        const lesson = action.payload;
        state.edit.course = {
          ...state.edit.course,
          chapters: state.edit.course.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((l) => {
              return l.id === lesson.id ? lesson : l;
            }),
          })),
        };
        state.edit.isLoading = false;
        state.edit.isSuccess = true;
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.edit.isLoading = false;
        state.edit.isError = true;
        state.edit.message = action.payload;
      })
      .addCase(deleteLesson.pending, (state, action) => {
        state.delete.isLoading = true;
        state.delete.isSuccess = false;
        state.delete.isError = false;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        const lessonId = action.payload;
        state.edit.course = {
          ...state.edit.course,
          chapters: state.edit.course.chapters.map((chapter) => {
            return {
              ...chapter,
              lessons: chapter.lessons.filter((lesson) => lesson.id !== lessonId),
            };
          }),
        };
        state.delete.isLoading = false;
        state.delete.isSuccess = true;
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.delete.isLoading = false;
        state.delete.isError = true;
        state.delete.message = action.payload;
      });
  },
});

export default teachingSlice.reducer;

export const { reset } = teachingSlice.actions;
