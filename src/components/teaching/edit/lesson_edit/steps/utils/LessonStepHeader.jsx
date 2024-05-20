import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import DeleteLessonStepDialog from '../../../prompt/DeleteLessonStepDialog';
import CloseIcon from '@mui/icons-material/Close';

function LessonStepHeader({ children }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant='h6' mr={1}>
          {children}
        </Typography>
        <IconButton
          aria-label='delete step'
          size='small'
          onClick={() => setDeleteDialogOpen(true)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
      <DeleteLessonStepDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
}

export default LessonStepHeader;
