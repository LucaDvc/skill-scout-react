import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import LessonsEngagementChart from './LessonsEngagementChart';
import StepEngagementCard from './StepEngagementCard';
import LessonStepsEngagementList from './LessonStepsEngagementList';

function CourseEngagementTab() {
  const { course } = useSelector((state) => state.teaching.edit);
  const modulesNo = course?.chapters?.length || 0;
  const lessonsNo = course?.chapters?.reduce(
    (acc, chapter) => acc + chapter.lessons.length,
    0
  );
  const stepsNo = course?.chapters?.reduce(
    (acc, chapter) =>
      acc +
      chapter?.lessons?.reduce((acc, lesson) => acc + lesson?.lesson_steps?.length, 0),
    0
  );
  return (
    course && (
      <Box sx={{ py: 2 }}>
        <Typography variant='h3' sx={{ mb: 2 }}>
          Course engagement
        </Typography>

        <Typography>
          Modules: {modulesNo}, Lessons: {lessonsNo}, Steps: {stepsNo}.
        </Typography>

        <LessonsEngagementChart />

        <Box sx={{ my: 2 }}>
          <Typography variant='h4' sx={{ my: 2 }} textAlign='center'>
            Engagement Metrics for Each Lesson Step
          </Typography>
          <LessonStepsEngagementList />
        </Box>
      </Box>
    )
  );
}

export default CourseEngagementTab;
