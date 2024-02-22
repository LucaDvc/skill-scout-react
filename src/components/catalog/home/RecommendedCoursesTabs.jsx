import React, { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Divider,
  IconButton,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import CoursesGrid from './CoursesGrid';

import { useDispatch, useSelector } from 'react-redux';
import {
  getHighestRatedCourses,
  getPopularCourses,
  reset,
} from '../../../features/catalog/catalogSlice';

function RecommendedCoursesTabs() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [coursesToDisplay, setCoursesToDisplay] = useState([]);

  const highestRatedSearchUrl = '/catalog/search?ordering=-avg_rating&page=1';
  const popularSearchUrl = '/catalog/search?ordering=-enrolled_learners&page=1';
  const [viewMoreUrl, setViewMoreUrl] = useState(highestRatedSearchUrl);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { highestRatedCourses, popularCourses, isError, isSuccess, isLoading } =
    useSelector((state) => state.catalog.recommendedCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && selectedTab === 0) {
      setCoursesToDisplay(highestRatedCourses);
    }
  }, [highestRatedCourses, isSuccess, selectedTab]);

  useEffect(() => {
    if (isSuccess && selectedTab === 1) {
      setCoursesToDisplay(popularCourses);
    }
  }, [popularCourses, isSuccess, selectedTab]);

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
      setSnackbarMessage('Failed to retrieve courses');
    }
  }, [isError]);

  useEffect(() => {
    if (!highestRatedCourses || highestRatedCourses.length === 0) {
      dispatch(getHighestRatedCourses());
    }
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
      setViewMoreUrl(popularSearchUrl);
    } else if (newValue === 0) {
      if (highestRatedCourses.length === 0) {
        dispatch(getHighestRatedCourses());
      } else {
        setCoursesToDisplay(highestRatedCourses);
      }
      setViewMoreUrl(highestRatedSearchUrl);
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
          severity={isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant='h3' gutterBottom>
          Online courses <ArrowDownwardIcon />
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor='secondary'
          textColor='secondary'
          aria-label='course tabs'
        >
          <Tab label='Highest rated courses' />
          <Tab label='Popular courses' />
        </Tabs>
        <Divider />
        <Box sx={{ width: '100%', marginTop: 2 }}>
          {isError ? (
            <Box sx={{ display: 'flex', alignContent: 'center' }}>
              <IconButton
                aria-label='reload'
                color='text.secondary'
                onClick={reloadCourses}
              >
                <ReplayIcon fontSize='large' />
              </IconButton>
            </Box>
          ) : (
            <CoursesGrid
              courses={coursesToDisplay}
              loading={isLoading}
              viewMoreLink={viewMoreUrl}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default RecommendedCoursesTabs;
