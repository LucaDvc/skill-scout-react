import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import SearchFiltersDrawer from '../../components/catalog/search/SearchFiltersDrawer';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  getCoursesByFilter,
  getTags,
} from '../../features/catalog/catalogSlice';
import { getCategories } from '../../features/category/categorySlice';
import LoadingLargeCard from '../../components/catalog/cards/LoadingLargeCard';
import CourseLargeCard from '../../components/catalog/cards/CourseLargeCard';
import LoadingSmallCard from '../../components/catalog/cards/LoadingSmallCard';
import CourseSmallCard from '../../components/catalog/cards/CourseSmallCard';
import { useLayout } from '../../context/LayoutContext';

function CatalogSearch() {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = 260;
  const [drawerOpen, setDrawerOpen] = useState(isXsScreen ? false : true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Layout context
  const { setShowNavbar, setShowFooter } = useLayout();

  useEffect(() => {
    setShowNavbar(true);
    setShowFooter(false);

    // Show Navbar and Footer when the component unmounts
    return () => {
      setShowNavbar(true);
      setShowFooter(true);
    };
  }, [setShowNavbar, setShowFooter]);

  // categories redux
  const {
    categories,
    isError: categoriesError,
    isSuccess: categoriesSuccess,
    isLoading: categoriesLoading,
  } = useSelector((state) => state.category);

  // catalog redux
  const {
    filteredCourses,
    resultsCount,
    isError: catalogError,
    isSuccess: catalogSuccess,
    isLoading: catalogLoading,
    tags,
  } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  // Sorting
  const [sorting, setSorting] = useState(searchParams.get('ordering') || '');

  // Filtering
  const [filters, setFilters] = useState({
    average_rating__gte: searchParams.get('average_rating__gte') || '',
    categories: searchParams.get('categories') || '',
    tags: searchParams.get('tags') || '',
    price__lte: searchParams.get('price__lte') || '',
    price__gte: searchParams.get('price__gte') || '',
  });

  const areFiltersActive = Object.values(filters).some((value) => value !== '');

  const handleClearFilters = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('search', searchParams.get('search') || '');
    newSearchParams.set('page', 1);
    setSearchParams(newSearchParams);
    setFilters({
      average_rating__gte: '',
      categories: '',
      tags: '',
      price__lte: '',
      price__gte: '',
    });

    setSorting('');

    setPage(1);
  };

  // Pagination logic
  const pageSize = 20;
  const [pageCount, setPageCount] = useState(
    Math.ceil(resultsCount / pageSize)
  );
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  const handlePageChange = (event, value) => {
    setPage(value);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', value);
    setSearchParams(newSearchParams);
  };

  // Update search params based on filters state
  useEffect(() => {
    const updateSearchParams = () => {
      const params = new URLSearchParams(searchParams);

      for (const filter in filters) {
        const value = filters[filter];

        if (value) {
          params.set(filter, value);
        } else {
          params.delete(filter);
        }
      }

      setSearchParams(params);
    };

    updateSearchParams();
  }, [filters]);

  // Fetch courses based on active filters
  useEffect(() => {
    dispatch(getCoursesByFilter(searchParams));
  }, [dispatch, searchParams]);

  // Set page count
  useEffect(() => {
    if (catalogSuccess) {
      setPageCount(Math.ceil(resultsCount / pageSize));
    }
  }, [resultsCount, setPageCount, catalogSuccess]);

  // Fetch categories
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  // Fetch tags
  useEffect(() => {
    if (!tags.list || tags.list.length === 0) {
      dispatch(getTags());
    }
  }, [dispatch, tags.list]);

  const handleSortingChange = (event) => {
    setSorting(event.target.value);

    const newSearchParams = new URLSearchParams(searchParams);

    event.target.value
      ? newSearchParams.set('ordering', event.target.value)
      : newSearchParams.delete('ordering');

    setSearchParams(newSearchParams);
  };

  // Handle filters drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container>
      <Box my={2}>
        <Button
          variant='outlined'
          startIcon={<FilterListIcon />}
          sx={{ marginRight: 2, padding: 1.75 }}
          onClick={handleDrawerToggle}
        >
          Filter
        </Button>
        <FormControl sx={{ minWidth: 155 }}>
          <InputLabel id='sorting-label'>Sort By</InputLabel>
          <Select
            labelId='sorting-label'
            id='sorting-select'
            label='Sorting'
            value={sorting}
            onChange={handleSortingChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='-reviews_no'>Most Reviewed</MenuItem>
            <MenuItem value='-avg_rating'>Highest Rated</MenuItem>
            <MenuItem value='-enrolled_learners'>Most Popular</MenuItem>
          </Select>
        </FormControl>
        {areFiltersActive && (
          <Button
            variant='text'
            startIcon={<ClearIcon />}
            sx={{ marginLeft: 2, padding: 1.75 }}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      <SearchFiltersDrawer
        open={drawerOpen}
        toggle={handleDrawerToggle}
        isXsScreen={isXsScreen}
        filterState={[filters, setFilters]}
        width={drawerWidth}
      />

      <Stack
        spacing={2}
        sx={{
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(drawerOpen &&
            !isXsScreen && {
              marginLeft: `${drawerWidth + 32}px`,
              transition: (theme) =>
                theme.transitions.create('margin', {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }),
        }}
      >
        {!catalogLoading && (
          <Typography variant='h3' my={2}>
            {resultsCount} results{' '}
            {searchParams.get('search') &&
              `for "${searchParams.get('search')}"`}
          </Typography>
        )}
        {/* Filtered courses cards and pagination*/}
        {!isXsScreen
          ? catalogLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <LoadingLargeCard key={index} />
              ))
            : filteredCourses &&
              filteredCourses.map((course) => (
                <CourseLargeCard key={course.id} course={course} />
              ))
          : catalogLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <LoadingSmallCard key={index} />
            ))
          : filteredCourses &&
            filteredCourses.map((course) => (
              <CourseSmallCard key={course.id} course={course} />
            ))}

        {!catalogLoading && (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Pagination
              count={pageCount}
              page={page}
              color='primary'
              onChange={handlePageChange}
              sx={{ my: 2 }} // Add margin if needed
            />
          </Box>
        )}
      </Stack>
    </Container>
  );
}

export default CatalogSearch;
