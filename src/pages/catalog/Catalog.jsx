import { Alert, Container, Snackbar } from '@mui/material';

import React, { useEffect, useState } from 'react';
import CategoriesMenu from '../../components/catalog/CategoriesMenu';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../features/catalog/catalogSlice';
import { getCategories } from '../../features/category/categorySlice';
import RecommendedCoursesTabs from '../../components/catalog/RecommendedCoursesTabs';
import TopCategoriesCoursesTabs from '../../components/catalog/TopCategoriesCoursesTabs';

function Catalog() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // redux
  const {
    categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryError) {
      setOpenSnackbar(true);
      setSnackbarMessage('Failed to retrieve categories');
    }
  }, [categoryError]);

  useEffect(() => {
    dispatch(getCategories());

    return () => dispatch(reset());
  }, [dispatch]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (openSnackbar) {
      setOpenSnackbar(false);
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
