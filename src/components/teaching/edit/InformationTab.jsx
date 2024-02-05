import { Box, Typography } from '@mui/material';
import React from 'react';
import UploadBox from './UploadBox';
import { useSelector } from 'react-redux';

function InformationTab() {
  const { course } = useSelector((state) => state.teaching.edit);
  return (
    course && (
      <Box mt={2}>
        <Typography variant='h5' gutterBottom>
          Information
        </Typography>
        <UploadBox imageUrl={course.image} />
      </Box>
    )
  );
}

export default InformationTab;
