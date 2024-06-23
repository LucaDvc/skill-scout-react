import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

function Spinner() {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 2000 }} open>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default Spinner;
