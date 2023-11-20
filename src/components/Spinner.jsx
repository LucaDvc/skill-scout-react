import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

function Spinner() {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default Spinner;
