import React from 'react';
import StepListCard from './StepListCard';
import { Box } from '@mui/material';

function StepsList({ steps }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
      {steps.map((step) => (
        <StepListCard key={step.id} step={step} />
      ))}
    </Box>
  );
}

export default StepsList;
