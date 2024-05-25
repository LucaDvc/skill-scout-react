import { Box, Typography } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function CheckItem({ title, description, isCompleted }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'start', gap: 1, my: 2, maxWidth: 'sm' }}>
      {isCompleted ? (
        <CheckIcon sx={{ color: 'green' }} />
      ) : (
        <CloseIcon sx={{ color: 'red' }} />
      )}
      <Box>
        <Typography variant='subtitle1'>{title}</Typography>
        <Typography variant='body2'>{description}</Typography>
      </Box>
    </Box>
  );
}

export default CheckItem;
