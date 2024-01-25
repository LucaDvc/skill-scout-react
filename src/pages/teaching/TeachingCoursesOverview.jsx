import {
  Box,
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
import React, { useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import TeachingCourseCard from '../../components/teaching/TeachingCourseCard';

function TeachingCoursesOverview() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    // apply filters
  };

  const handleSearch = () => {
    // apply search
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
            onChange={(event) => setSearch(event.target.value)}
          />
          <IconButton
            type='button'
            sx={{ p: '10px' }}
            aria-label='search'
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        {courses.map((course) => (
          <TeachingCourseCard course={course} />
        ))}
      </Box>
    </Container>
  );
}

export default TeachingCoursesOverview;
