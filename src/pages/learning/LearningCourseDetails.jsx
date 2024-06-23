import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById, reset } from '../../features/learning/learningSlice';
import Spinner from '../../components/layout/Spinner';
import { useTheme } from '@emotion/react';

function LearningCourseDetails() {
  const { courseId } = useParams();

  // Mui
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Router
  const location = useLocation();
  const selectedTab = location.pathname.split('/').pop();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { course, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.learning
  );

  useEffect(() => {
    if (!course || course.id !== courseId) {
      dispatch(getCourseById(courseId));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    if (isError && message === 'Not found') {
      navigate('/not-found');
    }
  }, [isError, message, isSuccess, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleListItemClick = (content) => {
    navigate(`/learning/courses/${courseId}/${content}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Grid container style={{ height: 'calc(100vh-64px)' }}>
      <Grid item xs={12} sm={3}>
        <Paper
          square
          elevation={6}
          sx={{
            height: '100%',
            minHeight: !isMobile && '100dvh',
            overflowY: 'auto',
            padding: 2,
          }}
        >
          <Box px={2}>
            {!isMobile && (
              <Avatar
                alt='Course Logo'
                src={course?.image}
                sx={{ width: 75, height: 75, borderRadius: 1 }}
              />
            )}

            <Typography variant='h6' sx={{ my: 2 }}>
              {course?.title}
            </Typography>

            {!isMobile && course && (
              <Box>
                <LinearProgress
                  variant='determinate'
                  value={course?.learner_progress.completion_ratio}
                  color='primary'
                  sx={{ borderRadius: 1 }}
                />
                <Typography variant='body2' component='span' fontWeight='bold'>
                  {course?.learner_progress.completion_ratio.toFixed(1)}
                </Typography>
                <Typography variant='body2' component='span'>
                  % completed
                </Typography>
                <Box display='block' mt={0.7}>
                  <Typography
                    variant='body2'
                    component='span'
                    fontWeight='bold'
                    gutterBottom
                  >
                    {course?.learner_progress.completed_lessons.length}/
                    {course?.lessons_count}
                  </Typography>
                  <Typography variant='body2' component='span'>
                    {' '}
                    lessons completed
                  </Typography>
                </Box>
                <Button
                  sx={{ padding: 1, paddingX: 4, display: 'block', my: 2 }}
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleListItemClick('publication')}
                >
                  <Typography variant='subtitle1'>Learn</Typography>
                </Button>
              </Box>
            )}
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedTab === 'syllabus'}
                onClick={() => handleListItemClick('syllabus')}
              >
                <ListItemText primary='Syllabus' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedTab === 'reviews'}
                onClick={() => handleListItemClick('reviews')}
              >
                <ListItemText primary='Reviews' />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={9} sx={{ height: 'calc(100vh-64px)', overflowY: 'auto' }}>
        <Container maxWidth='md'>
          <Outlet />
        </Container>
      </Grid>
    </Grid>
  );
}

export default LearningCourseDetails;
