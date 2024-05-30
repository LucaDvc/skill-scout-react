import { Box, CircularProgress, InputBase, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../features/learning/learningSlice';
import LearningCourseCard from './cards/LearningCourseCard';
import { toast } from 'react-toastify';

function ActiveCoursesTab() {
  const [search, setSearch] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const { courses, isLoading, isSuccess, isError, message, favourites } = useSelector(
    (state) => state.learning
  );
  const {
    isUpdating,
    isSuccess: favouriteSuccess,
    isError: favouriteError,
    message: favouriteMessage,
  } = favourites;
  const dispatch = useDispatch();

  const toastId = useRef(null);

  useEffect(() => {
    if (!courses || courses.length === 0) {
      dispatch(getCourses());
    }
  }, [dispatch, getCourses]);

  useEffect(() => {
    if (isSuccess) {
      setFilteredCourses(courses);
    }

    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, courses, isError, message]);

  const handleSearch = (searchVal) => {
    if (searchVal) {
      setFilteredCourses(
        filteredCourses.filter((course) =>
          course.title
            .toLowerCase()
            .trim()
            .split(' ')
            .join('')
            .includes(searchVal.toLowerCase().toLowerCase().trim().split(' ').join(''))
        )
      );
    } else {
      setFilteredCourses(courses);
    }
  };

  useEffect(() => {
    if (isUpdating) {
      toastId.current = toast.loading('Adding course to favourites...', {
        position: 'bottom-center',
        autoClose: false,
        isLoading: true,
      });
    }

    if (favouriteSuccess) {
      toast.update(toastId.current, {
        render: 'Course added to favourites!',
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }

    if (favouriteError) {
      toast.update(toastId.current, {
        render: message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  }, [isUpdating, favouriteSuccess, favouriteError, favouriteMessage]);

  return (
    <Box py={2}>
      <Typography variant='h3' sx={{ mb: 2 }}>
        Courses
      </Typography>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          boxShadow: 3,
          mb: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search your courses...'
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            handleSearch(event.target.value);
          }}
        />
        <SearchIcon />
      </Paper>

      {isLoading && <CircularProgress />}

      <Box display='flex' gap={2} flexDirection='column'>
        {filteredCourses.length !== 0 &&
          filteredCourses.map((course) => (
            <LearningCourseCard key={course.id} course={course} action='add' />
          ))}
      </Box>
    </Box>
  );
}

export default ActiveCoursesTab;
