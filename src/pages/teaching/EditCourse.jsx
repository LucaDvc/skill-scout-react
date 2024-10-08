import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById, reset } from '../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/layout/Spinner';
import { useTheme } from '@emotion/react';

function EditCourse() {
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
    (state) => state.teaching.edit
  );

  useEffect(() => {
    if (!course || course.id !== courseId) {
      dispatch(getCourseById(courseId));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    // }

    if (isSuccess) {
      dispatch(reset());
    }
  }, [isError, message, isSuccess, dispatch]);

  const handleListItemClick = (content) => {
    navigate(`/teaching/courses/${courseId}/${content}`);
  };

  const [expandedAccordions, setExpandedAccordions] = useState({
    contentAcc: true,
    analyticsAcc: true,
    settingsAcc: true,
  });

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpandedAccordions((prevState) => ({
      ...prevState,
      [panel]: isExpanded,
    }));
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

            {!isMobile && !course?.active && (
              <Button
                sx={{ padding: 1, paddingX: 6 }}
                variant='outlined'
                color='secondary'
                onClick={() => handleListItemClick('publication')}
              >
                <Typography variant='subtitle1'>Publish</Typography>
              </Button>
            )}
          </Box>
          <List>
            <Accordion
              disableGutters
              expanded={expandedAccordions.contentAcc}
              onChange={handleChangeAccordion('contentAcc')}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant='subtitle1'
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <MenuBookIcon sx={{ mr: 2 }} /> Content
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'information'}
                      onClick={() => handleListItemClick('information')}
                    >
                      <ListItemText primary='Information' />
                    </ListItemButton>
                  </ListItem>
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
                      selected={selectedTab === 'checklist'}
                      onClick={() => handleListItemClick('checklist')}
                    >
                      <ListItemText primary='Checklist' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion
              disableGutters
              expanded={expandedAccordions.analyticsAcc}
              onChange={handleChangeAccordion('analyticsAcc')}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant='subtitle1'
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <BarChartIcon sx={{ mr: 2 }} /> Analytics
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'reviews'}
                      onClick={() => handleListItemClick('reviews')}
                    >
                      <ListItemText primary='Reviews' />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'enrollments'}
                      onClick={() => handleListItemClick('enrollments')}
                    >
                      <ListItemText primary='Enrollments' />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'activity'}
                      onClick={() => handleListItemClick('activity')}
                    >
                      <ListItemText primary='Activity' />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'engagement'}
                      onClick={() => handleListItemClick('engagement')}
                    >
                      <ListItemText primary='Engagement' />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'assessments'}
                      onClick={() => handleListItemClick('assessments')}
                    >
                      <ListItemText primary='Assessments' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion
              disableGutters
              expanded={expandedAccordions.settingsAcc}
              onChange={handleChangeAccordion('settingsAcc')}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant='subtitle1'
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <SettingsIcon sx={{ mr: 2 }} /> Settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={selectedTab === 'publication'}
                      onClick={() => handleListItemClick('publication')}
                    >
                      <ListItemText primary='Publication' />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
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

export default EditCourse;
