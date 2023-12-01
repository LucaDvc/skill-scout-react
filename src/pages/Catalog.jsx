import { Container } from '@mui/material';
import React from 'react';
import CategoriesMenu from '../components/CategoriesMenu';

function Catalog() {
  return (
    <>
      <CategoriesMenu />
      <Container component='main' maxWidth='xs'>
        Catalog
      </Container>
    </>
  );
}

export default Catalog;
