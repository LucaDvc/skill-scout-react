import { Container } from '@mui/material';
import React from 'react';

const InternalServerError = () => {
  return (
    <Container maxWidth='xl'>
      <h1>500 - Internal Server Error</h1>
      <p>Something went wrong on our end. Please try again later.</p>
    </Container>
  );
};

export default InternalServerError;
