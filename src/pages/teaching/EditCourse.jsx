import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InformationTab from '../../components/teaching/edit/information/InformationTab';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

function EditCourse() {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const { course, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.teaching.edit
  );

  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const [activeContent, setActiveContent] = useState('information');

  const handleListItemClick = (content) => {
    setActiveContent(content);
  };

  const [expandedAccordions, setExpandedAccordions] = useState({
    contentAcc: true,
    analyticsAcc: false,
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
    <Grid container>
      <Grid item xs={12} sm={3}>
        <Stack>
          <Box
            sx={{
              height: 'calc(100vh - 64px)', // Adjust the height if your AppBar is different
              overflowY: 'auto',
            }}
            component={Paper}
            elevation={3}
          >
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
                        selected={activeContent === 'information'}
                        onClick={() => handleListItemClick('information')}
                      >
                        <ListItemText primary='Information' />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={activeContent === 'syllabus'}
                        onClick={() => handleListItemClick('syllabus')}
                      >
                        <ListItemText primary='Syllabus' />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </List>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={9}>
        <Container maxWidth='md'>
          {activeContent === 'information' && <InformationTab />}
          {/* Add more content components based on activeContent */}
        </Container>
      </Grid>
    </Grid>
  );
}

export default EditCourse;
