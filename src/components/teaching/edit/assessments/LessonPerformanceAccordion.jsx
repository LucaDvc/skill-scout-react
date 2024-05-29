import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssessmentStepPerformanceCard from './AssessmentStepPerformanceCard';

const LessonPerformanceAccordion = ({ data }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h6' textAlign='center' sx={{ mt: 4, mb: 2 }}>
        Grouped by Lessons
      </Typography>
      {data.length === 0 ? (
        <Typography fontSize={17} textAlign='center' sx={{ my: 2 }}>
          Unfortunately, there is no data available yet.
        </Typography>
      ) : (
        data.map((lesson, index) => (
          <Accordion
            key={lesson.lesson_id}
            elevation={1}
            sx={{
              border: '1px solid lightgray',
              '&:not(:last-child)': {
                borderBottom: 0,
              },
              '&::before': {
                display: 'none',
              },
            }}
            defaultExpanded={index < 3}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{lesson.lesson_title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {lesson.steps.map((step) => (
                <AssessmentStepPerformanceCard key={step.step_id} step={step} />
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default LessonPerformanceAccordion;
