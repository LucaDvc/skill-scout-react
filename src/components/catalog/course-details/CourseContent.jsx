import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';
import { nanoid } from 'nanoid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CourseContent({ course }) {
  return course?.chapters?.map((chapter, index) => (
    <React.Fragment key={nanoid()}>
      <Accordion
        disableGutters
        sx={{
          bgcolor: 'inherit',
          boxShadow: 'none',
          '&:before': { display: 'none' },
          '&:not(:last-child)': { borderBottom: 0 },
          '&:after': { display: 'none' },
        }}
        defaultExpanded
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h5'>{chapter.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {chapter.lessons.map((lesson) => (
            <Typography variant='body1' key={nanoid()}>
              {lesson.order + '. ' + lesson.title}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>

      {index !== course.chapters?.length - 1 && <Divider />}
    </React.Fragment>
  ));
}

export default CourseContent;
