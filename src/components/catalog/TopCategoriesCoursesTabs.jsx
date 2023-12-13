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
import { getCoursesByFilter, reset } from '../../features/catalog/catalogSlice';

function TopCategoriesCoursesTabs() {
  const DEVELOPMENT_CATEGORY = 'Development';
  const BUSINESS_CATEGORY = 'Business';
  const DESIGN_CATEGORY = 'Design';
  const VIEW_MORE_ROOT_URL = '/catalog/search?category=';

  const [viewMoreUrl, setViewMoreUrl] = useState(
    VIEW_MORE_ROOT_URL + DEVELOPMENT_CATEGORY
  );

  const [selectedTab, setSelectedTab] = useState(DEVELOPMENT_CATEGORY);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [coursesToDisplay, setCoursesToDisplay] = useState([]);
  const [developmentCourses, setDevelopmentCourses] = useState([]);
  const [businessCourses, setBusinessCourses] = useState([]);
  const [designCourses, setDesignCourses] = useState([]);

  const { filteredCourses, isError, isSuccess, isLoading } = useSelector(
    (state) => state.catalog
  );
  const dispatch = useDispatch();

  const fetchCategoryCourses = (category) => {
    const params = new URLSearchParams();
    params.append('page', 1);
    params.append('category', category);
    dispatch(getCoursesByFilter(params));
  };

  useEffect(() => {
    if (isSuccess) {
      const fetchedCourses = filteredCourses.slice(0, 5);
      setCoursesToDisplay(fetchedCourses);

      switch (selectedTab) {
        case DEVELOPMENT_CATEGORY:
          setDevelopmentCourses(fetchedCourses);
          break;
        case BUSINESS_CATEGORY:
          setBusinessCourses(fetchedCourses);
          break;
        case DESIGN_CATEGORY:
          setDesignCourses(fetchedCourses);
          break;
        default:
          setDevelopmentCourses(fetchedCourses);
          break;
      }
    }
  }, [filteredCourses, isSuccess]);

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
      setSnackbarMessage('Failed to retrieve courses');
    }
  }, [isError]);

  useEffect(() => {
    fetchCategoryCourses(DEVELOPMENT_CATEGORY);

    return () => dispatch(reset());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);

    if (newValue === DEVELOPMENT_CATEGORY) {
      if (developmentCourses.length === 0) {
        fetchCategoryCourses(newValue);
      } else {
        setCoursesToDisplay(developmentCourses);
      }
      setViewMoreUrl(VIEW_MORE_ROOT_URL + DEVELOPMENT_CATEGORY);
    } else if (newValue === BUSINESS_CATEGORY) {
      if (businessCourses.length === 0) {
        fetchCategoryCourses(newValue);
      } else {
        setCoursesToDisplay(businessCourses);
      }
      setViewMoreUrl(VIEW_MORE_ROOT_URL + BUSINESS_CATEGORY);
    } else if (newValue === DESIGN_CATEGORY) {
      if (designCourses.length === 0) {
        fetchCategoryCourses(newValue);
      } else {
        setCoursesToDisplay(designCourses);
      }
      setViewMoreUrl(VIEW_MORE_ROOT_URL + DESIGN_CATEGORY);
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
    fetchCategoryCourses(selectedTab);
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

      <Box sx={{ flexGrow: 1, padding: 2, mt: 8 }}>
        <Typography variant='h3' gutterBottom>
          Top Categories <ArrowDownwardIcon />
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor='secondary'
          textColor='secondary'
          aria-label='course tabs'
        >
          <Tab label={DEVELOPMENT_CATEGORY} value={DEVELOPMENT_CATEGORY} />
          <Tab label={BUSINESS_CATEGORY} value={BUSINESS_CATEGORY} />
          <Tab label={DESIGN_CATEGORY} value={DESIGN_CATEGORY} />
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

export default TopCategoriesCoursesTabs;
