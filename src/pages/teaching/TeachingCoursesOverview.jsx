import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TeachingCourseCard from '../../components/teaching/cards/TeachingCourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, reset } from '../../features/teaching/teachingSlice';
import { useNavigate } from 'react-router-dom';

function TeachingCoursesOverview() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const navigate = useNavigate();

  const {
    courses,
    isLoading,
    isSuccess,
    isError,
    message,
    delete: { isSuccess: deleteSuccess },
    create: { isSuccess: createSuccess },
  } = useSelector((state) => state.teaching);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess || deleteSuccess || createSuccess) {
      setFilteredCourses(courses);
      dispatch(reset());
    }
  }, [isSuccess, courses, deleteSuccess]);

  const applyFilters = (filter) => {
    switch (filter) {
      case 'all':
        setFilteredCourses(courses);
        break;
      case 'drafted':
        setFilteredCourses(
          courses.filter((course) => course.release_date === null)
        );
        break;
      case 'active':
        setFilteredCourses(courses.filter((course) => course.active));
        break;
      case 'inactive':
        setFilteredCourses(
          courses.filter(
            (course) => !course.active && course.release_date !== null
          )
        );
        break;
    }
  };

  useEffect(() => {
    applyFilters(filter);
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = (searchVal) => {
    if (searchVal) {
      setFilteredCourses(
        filteredCourses.filter((course) =>
          course.title
            .toLowerCase()
            .trim()
            .split(' ')
            .join('')
            .includes(
              searchVal.toLowerCase().toLowerCase().trim().split(' ').join('')
            )
        )
      );
    } else {
      applyFilters(filter);
    }
  };

  return (
    <Container component='main' maxWidth='md'>
      <Typography variant='h3' gutterBottom mt={2}>
        Courses <ArrowDownwardIcon />
      </Typography>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <FormControl sx={{ minWidth: 155 }}>
          <InputLabel id='filter'>Filter</InputLabel>
          <Select
            labelId='filter'
            id='filter-select'
            label='Filter'
            value={filter}
            onChange={handleFilterChange}
          >
            <MenuItem value='all'>All Courses</MenuItem>
            <MenuItem value='drafted'>Drafted</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </Select>
        </FormControl>
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            boxShadow: 3,
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
        <Button
          startIcon={<AddIcon fontSize='large' />}
          p={4}
          variant='outlined'
          color='secondary'
          onClick={() => navigate('/teaching/courses/new')}
        >
          <Typography variant='subtitle'>New Course</Typography>
        </Button>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress color='inherit' />
        </Box>
      ) : (
        <Box sx={{ marginTop: 4 }}>
          {filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Box mt={2} key={course.id}>
                <TeachingCourseCard course={course} />
              </Box>
            ))
          ) : (
            <Typography variant='h5' gutterBottom mt={2}>
              No courses found.
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
}

export default TeachingCoursesOverview;
