import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '../../features/catalog/catalogSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAlt1BarRoundedIcon from '@mui/icons-material/SignalCellularAlt1BarRounded';
import SignalCellularAlt2BarRoundedIcon from '@mui/icons-material/SignalCellularAlt2BarRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import Spinner from '../../components/Spinner';
import MainDetailsContent from '../../components/catalog/course-details/MainDetailsContent';

function CourseDetails() {
  const { courseId } = useParams();
  const { course, isLoading, isError, message } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, [courseId]);

  useEffect(() => {
    if (isError) {
      if (message === 'Not found') {
        navigate('/not-found');
      }
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box pb={4}>
      {/* Course Header Card */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: 'primary.light',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100vw',
            margin: 0,
            color: 'white',
          }}
          px={{ xs: 4, sm: 8, md: 18, lg: 24, xl: 24 }}
        >
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            py={{ xs: 4, sm: 8 }}
          >
            <Grid item container direction='column' spacing={3} xs={12} md={12} lg={8}>
              <Grid item>
                <Typography variant='h4'>{course.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>{course.intro}</Typography>
              </Grid>
              <Grid
                item
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    marginRight: 12,
                  }}
                >
                  {course.level === 'Beginner' ? (
                    <SignalCellularAlt1BarRoundedIcon
                      fontSize='medium'
                      sx={{ mr: 0.75 }}
                    />
                  ) : course.level === 'Intermediate' ? (
                    <SignalCellularAlt2BarRoundedIcon
                      fontSize='medium'
                      sx={{ mr: 0.75 }}
                    />
                  ) : (
                    <SignalCellularAltRoundedIcon fontSize='medium' sx={{ mr: 0.75 }} />
                  )}
                  <Typography variant='subtitle2' component='span' maxWidth={2}>
                    {course.level} Level
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignContent: 'center' }}>
                  <AccessTimeIcon fontSize='medium' sx={{ mr: 0.75 }} />
                  <Typography variant='subtitle2' component='span'>
                    {course.total_hours} hours
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction='column'
              justifyContent='center'
              alignItems='flex-end'
              xs
              spacing={3}
            >
              <Grid
                item
                lg={12}
                sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}
              >
                <Avatar
                  src={course.image}
                  alt='Course Thumbnail'
                  variant='rounded'
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid
                container
                item
                xs
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
              >
                <Stack spacing={1} alignItems='center'>
                  <Box
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                    }}
                  >
                    <Rating
                      name='read-only'
                      value={course.average_rating}
                      precision={0.1}
                      readOnly
                      size='medium'
                    />
                    <Typography variant='subtitle2' component='span'>
                      {' ' + (course.average_rating % 1) === 0
                        ? course.average_rating?.toFixed(0)
                        : course.average_rating?.toFixed(1)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                    }}
                  >
                    <Typography variant='subtitle2' component='span'>
                      {course.enrolled_learners} learners
                    </Typography>
                  </Box>
                </Stack>

                <Link href='#reviews' color='inherit'>
                  {course.reviews?.length} reviews
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <MainDetailsContent course={course} />
    </Box>
  );
}

export default CourseDetails;
