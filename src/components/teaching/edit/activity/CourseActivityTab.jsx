import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import CourseCompletionDonut from './CourseCompletionDonut';
import ActiveUsersLineChart from './ActiveUsersLineChart';
import { useSelector } from 'react-redux';

const CourseActivityTab = () => {
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
          Course activity
        </Typography>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                py: 2,
                height: '100%',
              }}
            >
              <Typography variant='h5'>{course.title}</Typography>
              <ul style={{ alignSelf: 'center' }}>
                <li>
                  <Typography fontSize={18}>Modules: {modulesNo} </Typography>
                </li>
                <li>
                  <Typography fontSize={18}>Lessons: {lessonsNo}</Typography>
                </li>
                <li>
                  <Typography fontSize={18}>Steps: {stepsNo}</Typography>
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CourseCompletionDonut />
          </Grid>
        </Grid>
        <ActiveUsersLineChart />
      </Box>
    )
  );
};

export default CourseActivityTab;
