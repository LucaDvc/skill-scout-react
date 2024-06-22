import { Alert, Container, Snackbar } from '@mui/material';

import React, { useEffect, useState } from 'react';
import CategoriesMenu from '../../components/catalog/home/CategoriesMenu';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../features/catalog/catalogSlice';
import { getCategories } from '../../features/category/categorySlice';
import RecommendedCoursesTabs from '../../components/catalog/home/RecommendedCoursesTabs';
import TopCategoriesCoursesTabs from '../../components/catalog/home/TopCategoriesCoursesTabs';
import { toast } from 'react-toastify';

function Catalog() {
  // redux
  const {
    categories,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryError) {
      toast.error('Failed to retrieve categories');
    }
  }, [categoryError]);

  useEffect(() => {
    if (!categories || categories.length === 0) dispatch(getCategories());

    return () => dispatch(reset());
  }, [dispatch]);

  return (
    <>
      <CategoriesMenu categories={categories} loading={categoryLoading} />

      <Container component='main' maxWidth='lg'>
        <RecommendedCoursesTabs />
        <TopCategoriesCoursesTabs />
      </Container>
    </>
  );
}

export default Catalog;
