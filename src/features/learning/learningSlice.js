import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import learningService from './learningService';
import catalogService from '../catalog/catalogService';

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
  wishlist: {
    courses: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  drop: {
    isLoading: false,
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

export const getWishlist = createAsyncThunk(
  'learning/getWishlist',
  async (_, thunkAPI) => {
    try {
      return await catalogService.getWishlist();
    } catch (error) {
      let message = error.message || error.toString();
      thunkAPI.rejectWithValue(message);
    }
  }
);

export const completeLessonStep = createAsyncThunk(
  'learning/completeLessonStep',
  async (stepId, thunkAPI) => {
    try {
      return await learningService.completeLessonStep(stepId);
    } catch (error) {
      let message = error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dropCourse = createAsyncThunk(
  'learning/dropCourse',
  async (courseId, thunkAPI) => {
    try {
      await learningService.dropCourse(courseId);
      return courseId;
    } catch (error) {
      let message = error.message || error.toString();
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
      })
      .addCase(getWishlist.pending, (state) => {
        state.wishlist.isLoading = true;
        state.wishlist.isSuccess = false;
        state.wishlist.isError = false;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist.isLoading = false;
        state.wishlist.courses = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.wishlist.isLoading = false;
        state.wishlist.isError = true;
        state.wishlist.message = action.payload;
      })
      .addCase(completeLessonStep.fulfilled, (state, action) => {
        state.course.learner_progress = action.payload;
        const { completed_chapters, completed_lessons, completed_steps } = action.payload;

        state.course.chapters = state.course.chapters.map((chapter) => {
          if (completed_chapters.includes(chapter.id)) {
            chapter.completed = true;
          }

          chapter.lessons = chapter.lessons.map((lesson) => {
            if (completed_lessons.includes(lesson.id)) {
              lesson.completed = true;
            }

            lesson.lesson_steps = lesson.lesson_steps.map((step) => {
              if (completed_steps.includes(step.id)) {
                step.completed = true;
              }

              return step;
            });

            return lesson;
          });

          return chapter;
        });
      })
      .addCase(completeLessonStep.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(dropCourse.pending, (state) => {
        state.drop.isLoading = true;
        state.drop.isSuccess = false;
        state.drop.isError = false;
      })
      .addCase(dropCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
        state.favourites.courses = state.favourites.courses.filter(
          (course) => course.id !== action.payload
        );
        state.drop.isLoading = false;
        state.drop.isSuccess = true;
      })
      .addCase(dropCourse.rejected, (state, action) => {
        state.drop.isError = true;
        state.drop.message = action.payload;
      });
  },
});

export default learningSlice.reducer;

export const { reset, statusesReset } = learningSlice.actions;
