import { Box, Typography } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

function ChecklistItem({ title, isCompleted }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2, maxWidth: 'sm' }}>
      {isCompleted ? (
        <CheckIcon fontSize='medium' sx={{ color: 'green' }} />
      ) : (
        <CloseIcon fontSize='medium' sx={{ color: 'red' }} />
      )}
      <Box>
        <Typography variant='body1'>{title}</Typography>
      </Box>
    </Box>
  );
}

export default ChecklistItem;
