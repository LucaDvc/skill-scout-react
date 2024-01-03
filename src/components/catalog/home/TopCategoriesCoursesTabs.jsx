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
import { getCoursesByFilter, reset } from '../../../features/catalog/catalogSlice';

function TopCategoriesCoursesTabs() {
  const VIEW_MORE_ROOT_URL = '/catalog/search?page=1&categories=';

  const [viewMoreUrl, setViewMoreUrl] = useState(VIEW_MORE_ROOT_URL);

  const [selectedTab, setSelectedTab] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [coursesToDisplay, setCoursesToDisplay] = useState([]);
  const [topCategoryCourses, setTopCategoryCourses] = useState({});

  // redux
  const { filteredCourses, isError, isSuccess, isLoading } = useSelector(
    (state) => state.catalog
  );
  const { topCategories, isLoading: categoriesLoading } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  const fetchCoursesByCategoryName = (categoryName) => {
    const params = new URLSearchParams();
    params.append('page', 1);
    params.append('categories', categoryName);
    dispatch(getCoursesByFilter(params));
  };

  useEffect(() => {
    if (
      !categoriesLoading &&
      topCategories &&
      topCategories.length > 0 &&
      selectedTab === ''
    ) {
      setSelectedTab(topCategories[0].name);
    }

    return () => dispatch(reset());
  }, [dispatch, topCategories, selectedTab]);

  useEffect(() => {
    if (isSuccess) {
      const fetchedCourses = filteredCourses.slice(0, 5);

      setTopCategoryCourses((prevState) => ({
        ...prevState,
        [selectedTab]: fetchedCourses,
      }));
      setCoursesToDisplay(fetchedCourses);
    }
  }, [filteredCourses, isSuccess]);

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
      setSnackbarMessage('Failed to retrieve courses');
    }
  }, [isError]);

  useEffect(() => {
    if (
      topCategoryCourses[selectedTab] &&
      topCategoryCourses[selectedTab].length > 0
    ) {
      setCoursesToDisplay(topCategoryCourses[selectedTab]);
    } else {
      fetchCoursesByCategoryName(selectedTab);
    }

    setViewMoreUrl(VIEW_MORE_ROOT_URL + selectedTab);
    // eslint-disable-next-line
  }, [selectedTab]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
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
    setTopCategoryCourses((prevState) => ({
      ...prevState,
      [selectedTab]: [],
    }));
    fetchCoursesByCategoryName(selectedTab);
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
        {selectedTab && (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor='secondary'
            textColor='secondary'
            aria-label='course tabs'
          >
            {!categoriesLoading &&
              topCategories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  value={category.name}
                />
              ))}
          </Tabs>
        )}

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
