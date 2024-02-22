import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../../features/teaching/teachingSlice';
import { useLayout } from '../../context/LayoutContext';
import Spinner from '../../components/Spinner';

function EditLessonsDetails() {
  const { courseId, lessonId } = useParams();

  const { setShowFooter, setNavbarFixed } = useLayout();

  const dispatch = useDispatch();
  const { course, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.teaching.edit
  );

  useEffect(() => {
    setShowFooter(false);
    setNavbarFixed(true);
    if (!course) {
      dispatch(getCourseById(courseId));
    }

    return () => {
      setShowFooter(true);
      setNavbarFixed(false);
    };
  }, [dispatch, courseId]);

  if (!course && isLoading) {
    return <Spinner />;
  }

  return (
    course && (
      <Grid container>
        {isLoading && <Spinner />}
        <Grid item xs={12} sm={2}>
          <Divider />
          <Paper
            square
            elevation={0}
            sx={{
              height: '100%',
              overflowY: 'auto',
              backgroundColor: 'primary.main',
              position: 'fixed',
              left: 0,
              top: 75,
            }}
          >
            <List>
              <ListItem>
                <Link
                  to={`/teaching/courses/${course.id}/syllabus`}
                  className='link-no-style'
                >
                  <Typography
                    variant='subtitle1'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'primary.contrastText',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {course.title}
                  </Typography>
                </Link>
              </ListItem>
              <List>
                {course.chapters.map((chapter, index) => (
                  <>
                    <ListItem key={chapter.id} disablePadding>
                      <ListItemButton>
                        <Typography
                          variant='body1'
                          sx={{ color: 'primary.contrastText' }}
                        >
                          {index + 1}. {chapter.title}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                    {chapter.lessons.map((lesson) => (
                      <Link
                        to={`/teaching/${courseId}/lessons/${lesson.id}`}
                        className='link-no-style'
                      >
                        <ListItem key={lesson.id} disablePadding>
                          <ListItemButton
                            sx={{
                              backgroundColor:
                                lesson.id === lessonId
                                  ? 'primary.dark'
                                  : 'inherit',
                            }}
                          >
                            <Typography
                              variant='body2'
                              sx={{ color: 'primary.contrastText' }}
                              paddingLeft={2}
                            >
                              {index + 1}.{lesson.order}. {lesson.title}
                            </Typography>
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                  </>
                ))}
              </List>
            </List>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          sx={{ height: 'calc(100vh-64px)', overflowY: 'auto' }}
        >
          <Container maxWidth='lg'>
            <Outlet />
          </Container>
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              padding: 2,
            }}
          >
            <Button variant='contained' type='submit'>
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    )
  );
}

export default EditLessonsDetails;
