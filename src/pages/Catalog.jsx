import {
  Alert,
  Box,
  Container,
  Divider,
  IconButton,
  Snackbar,
  Tabs,
  Typography,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import React, { useEffect, useState } from 'react';
import CategoriesMenu from '../components/catalog/CategoriesMenu';
import CoursesGrid from '../components/catalog/CoursesGrid';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHighestRatedCourses,
  getPopularCourses,
  reset,
} from '../features/catalog/catalogSlice';
import { getCategories } from '../features/category/categorySlice';
import RecommendedCoursesTabs from '../components/catalog/RecommendedCoursesTabs';
import TopCategoriesCoursesTabs from '../components/catalog/TopCategoriesCoursesTabs';

function Catalog() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [coursesToDisplay, setCoursesToDisplay] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // redux
  const {
    highestRatedCourses,
    popularCourses,
    isError: catalogError,
    isSuccess: catalogSuccess,
    isLoading: catalogLoading,
  } = useSelector((state) => state.catalog);

  const {
    categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogSuccess && selectedTab === 0) {
      setCoursesToDisplay(highestRatedCourses);
    }
  }, [highestRatedCourses, catalogSuccess, selectedTab]);

  useEffect(() => {
    if (catalogSuccess && selectedTab === 1) {
      setCoursesToDisplay(popularCourses);
    }
  }, [popularCourses, catalogSuccess, selectedTab]);

  useEffect(() => {
    if (catalogError) {
      setOpenSnackbar(true);
      setSnackbarMessage('Failed to retrieve courses');
    }

    if (categoryError) {
      setOpenSnackbar(true);
      setSnackbarMessage('Failed to retrieve categories');
    }
  }, [catalogError, categoryError]);

  useEffect(() => {
    dispatch(getHighestRatedCourses());
    dispatch(getCategories());

    return () => dispatch(reset());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);

    if (newValue === 1) {
      if (popularCourses.length === 0) {
        dispatch(getPopularCourses());
      } else {
        setCoursesToDisplay(popularCourses);
      }
    } else if (newValue === 0) {
      if (highestRatedCourses.length === 0) {
        dispatch(getHighestRatedCourses());
      } else {
        setCoursesToDisplay(highestRatedCourses);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (openSnackbar) {
      setOpenSnackbar(false);
    }
  };

  const reloadCourses = () => {
    dispatch(reset());
    if (selectedTab === 0) {
      dispatch(getHighestRatedCourses());
    } else if (selectedTab === 1) {
      dispatch(getPopularCourses());
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={categoryError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <CategoriesMenu categories={categories} loading={categoryLoading} />

      <Container component='main' maxWidth='lg'>
        <RecommendedCoursesTabs />
        <TopCategoriesCoursesTabs />
      </Container>
    </>
  );
}

export default Catalog;
