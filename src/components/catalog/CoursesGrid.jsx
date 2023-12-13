import { Grid } from '@mui/material';
import React from 'react';
import CourseSmallCard from './CourseSmallCard';
import LoadingSmallCard from './LoadingSmallCard';
import ViewMoreCard from './ViewMoreCard';

function CoursesGrid({ courses, loading, viewMoreLink }) {
  return (
    <Grid container spacing={4}>
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <LoadingSmallCard />
            </Grid>
          ))
        : courses.map((course, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <CourseSmallCard course={course} />
            </Grid>
          ))}
      {!loading && (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ViewMoreCard link={viewMoreLink} />
        </Grid>
      )}
    </Grid>
  );
}

export default CoursesGrid;
