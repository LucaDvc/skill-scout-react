import { Box, Typography } from '@mui/material';
import React from 'react';
import CheckItem from './CheckItem';
import { useSelector } from 'react-redux';
import { useCourseChecklist } from '../../../../hooks/useCourseChecklist';

function ChecklistTab() {
  const { course } = useSelector((state) => state.teaching.edit);

  const {
    atLeastTwoModules,
    atLeastTenLessons,
    atLeastTenAssignments,
    noEmptyModules,
    allVideosUploaded,
    logoUploaded,
    summaryMoreThan100,
    categorySelected,
    pointsCheckedNumber,
    lessonsNumber,
    assignmentsNumber,
  } = useCourseChecklist();

  return (
    course && (
      <Box sx={{ py: 2 }}>
        <Typography variant='h3' mb={2}>
          Checklist
        </Typography>
        <Typography variant='h6' mb={2}>
          Course is {pointsCheckedNumber}/8 ready
        </Typography>

        <Typography variant='h5' gutterBottom>
          Structure and content
        </Typography>

        <CheckItem
          title='At least 2 modules'
          description='Divide the course into at least two modules to make the content easier to comprehend.'
          isCompleted={atLeastTwoModules}
        />

        <CheckItem
          title={`At least 10 lessons (now ${lessonsNumber})`}
          description='We recommend you put at least ten lessons in your course.'
          isCompleted={atLeastTenLessons}
        />

        <CheckItem
          title={`At least 10 assignments (now ${assignmentsNumber})`}
          description='We believe that practice is the best way to learn. Add at least 10 assignments to your course.'
          isCompleted={atLeastTenAssignments}
        />

        <CheckItem
          title='No empty modules'
          description='Each module should have at least one lesson, otherwise the course will seem unfinished. Remove empty modules or add lessons to them.'
          isCompleted={noEmptyModules}
        />

        <CheckItem
          title='All videos in steps are uploaded'
          description='Make sure that videos are uploaded to all video steps.'
          isCompleted={allVideosUploaded}
        />

        <Typography variant='h5' gutterBottom>
          Presentation
        </Typography>

        <CheckItem
          title='Logo is uploaded'
          description="Your course's logo is the first thing learners see in the catalog."
          isCompleted={logoUploaded}
        />

        <CheckItem
          title='Summary is more than 100 symbols'
          description='Try to summarize what your course is about. Learners will see this description in the search and at the course promo page right under the course title.'
          isCompleted={summaryMoreThan100}
        />

        <CheckItem
          title='The course category is specified'
          description='Choose a more precise category to make it easier for learners to find your course.'
          isCompleted={categorySelected}
        />
      </Box>
    )
  );
}

export default ChecklistTab;
