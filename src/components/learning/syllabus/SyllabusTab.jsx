import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ModuleCard from './cards/ModuleCard';

function SyllabusTab() {
  const { course } = useSelector((state) => state.learning);
  return (
    <Box py={2}>
      <Typography variant='h3'>Course Content</Typography>
      <Box mt={2}>
        {course?.chapters.map((chapter, index) => (
          <ModuleCard key={chapter.id} chapter={chapter} index={index + 1} />
        ))}
      </Box>
    </Box>
  );
}

export default SyllabusTab;
