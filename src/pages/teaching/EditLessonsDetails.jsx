import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getCourseById } from '../../features/teaching/teachingSlice';
import { useLayout } from '../../context/LayoutContext';
import Spinner from '../../components/Spinner';
import { useTheme } from '@emotion/react';
import { EditLessonProvider } from '../../context/EditLessonContext';

function EditLessonsDetails() {
  const { courseId, lessonId } = useParams();

  const { setShowFooter, setNavbarFixed } = useLayout();

  const dispatch = useDispatch();
  const { course, isLoading } = useSelector((state) => state.teaching.edit);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                          to={`/teaching/edit-lessons/${course.id}/lessons/${lesson.id}`}
                          className='link-no-style'
                          key={lesson.id}
                        >
                          <ListItem disablePadding>
                            <ListItemButton
                              sx={{
                                backgroundColor:
                                  lesson.id === lessonId ? 'primary.dark' : 'inherit',
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
          <Box mt={4}>
            <EditLessonProvider>
              <Outlet />
            </EditLessonProvider>
          </Box>
        </Box>
      </Box>
    )
  );
}

export default EditLessonsDetails;
