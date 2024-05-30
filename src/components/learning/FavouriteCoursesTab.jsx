import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavouriteCourses } from '../../features/learning/learningSlice';
import LearningCourseCard from './cards/LearningCourseCard';
import { toast } from 'react-toastify';

function FavouriteCoursesTab() {
  const { courses, isLoading, isSuccess, isError, message, isUpdating } = useSelector(
    (state) => state.learning.favourites
  );
  const dispatch = useDispatch();

  const toastId = useRef(null);

  useEffect(() => {
    if (!courses || courses.length === 0) {
      dispatch(getFavouriteCourses());
    }
  }, [dispatch, getFavouriteCourses]);

  useEffect(() => {
    if (isUpdating) {
      toastId.current = toast.loading('Removing course from favourites...', {
        position: 'bottom-center',
        autoClose: false,
        isLoading: true,
      });
    }

    if (isSuccess) {
      toast.update(toastId.current, {
        render: 'Removed course from favourites!',
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }

    if (isError) {
      toast.update(toastId.current, {
        render: message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  }, [isUpdating, isSuccess, isError, message]);

  return (
    <Box py={2}>
      <Typography variant='h3' sx={{ mb: 2 }}>
        Favourite courses
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box display='flex' gap={2} flexDirection='column'>
          {courses.length !== 0 ? (
            courses.map((course) => (
              <LearningCourseCard key={course.id} course={course} action='remove' />
            ))
          ) : (
            <Typography variant='body1'>You have no favourite courses yet.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default FavouriteCoursesTab;
