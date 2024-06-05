import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../../features/learning/learningSlice';
import { useLayout } from '../../context/LayoutContext';
import Spinner from '../../components/Spinner';
import { useTheme } from '@emotion/react';
import StepsList from '../../components/learning/lesson/StepsList';

function LearningLessonPage() {
  const { courseId, lessonId } = useParams();

  const { setShowFooter, setNavbarFixed } = useLayout();

  const dispatch = useDispatch();
  const { course, isLoading } = useSelector((state) => state.learning);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [lesson, setLesson] = useState(null);
  const [stepsCompleted, setStepsCompleted] = useState(0);
  const [steps, setSteps] = useState([]);

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

  useEffect(() => {
    if (course) {
      const lesson = course.chapters
        .map((chapter) => chapter.lessons)
        .flat()
        .find((lesson) => lesson.id === lessonId);

      if (lesson) {
        const chapterIndex = course.chapters.findIndex(
          (chapter) => chapter.id === lesson.chapter_id
        );
        const lessonIndex = course.chapters[chapterIndex].lessons.findIndex(
          (l) => l.id === lesson.id
        );
        const stepsCompleted = lesson.lesson_steps.filter(
          (step) => step.completed
        ).length;
        setStepsCompleted(stepsCompleted);
        setSteps([...lesson.lesson_steps]);
        setLesson({ ...lesson, index: `${chapterIndex + 1}.${lessonIndex + 1}` });
      }
    }
  }, [course, lessonId]);

  if ((!course && isLoading) || !lesson) {
    return <Spinner />;
  }

  const drawerWidth = 280;

  return (
    course && (
      <Box sx={{ display: 'flex' }}>
        {!isMobile && (
          <Drawer
            variant='permanent'
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box
              sx={{
                overflow: 'auto',
                backgroundColor: 'primary.main',
                marginTop: 1,
                minHeight: 'calc(100dvh - 72px)',
              }}
            >
              <List>
                <ListItem>
                  <Link
                    to={`/learning/courses/${course.id}/syllabus`}
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
                    <React.Fragment key={chapter.id}>
                      <ListItem disablePadding>
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
                          to={`/learning/course/${courseId}/lessons/${lesson.id}/step/1`}
                          className='link-no-style'
                          key={lesson.id}
                        >
                          <ListItem disablePadding>
                            <ListItemButton
                              sx={{
                                backgroundColor:
                                  lesson.id === lessonId ? 'primary.light' : 'inherit',
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
                    </React.Fragment>
                  ))}
                </List>
              </List>
            </Box>
          </Drawer>
        )}

        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: 'white',
            paddingBottom: 9,
            minHeight: '100dvh',
          }}
        >
          <Toolbar />
          <Box
            width='100%'
            sx={{
              backgroundColor: 'white',
              position: 'sticky',
              top: '75px',
              zIndex: 1100,
            }}
          >
            <Container maxWidth='lg' sx={{ py: 1, overflow: 'auto' }}>
              <StepsList steps={steps} />
            </Container>

            <Container maxWidth='lg' sx={{ py: 1 }}>
              <Typography variant='body1' component='span'>
                {lesson.index} {' ' + lesson.title}
              </Typography>
              <Typography
                variant='body1'
                component='span'
                color='text.secondary'
                sx={{ ml: 2 }}
              >
                {stepsCompleted} out of {lesson.lesson_steps.length} steps passed
              </Typography>
            </Container>

            <Divider sx={{ borderColor: 'gray' }} />
          </Box>
          <Container maxWidth='lg' sx={{ mt: 8 }}>
            <Outlet context={{ steps }} />
          </Container>
        </Box>
      </Box>
    )
  );
}

export default LearningLessonPage;
