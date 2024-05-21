import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLayout } from '../../../../context/LayoutContext';
import { useDispatch, useSelector } from 'react-redux';
import StepsList from './StepsList';
import GenericStepEdit from './steps/GenericStepEdit';
import UnsavedChangesPrompt from '../prompt/UnsavedChangesPrompt';
import { useEditLesson } from '../../../../context/EditLessonContext';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteLessonDialog from '../prompt/DeleteLessonDialog';
import Spinner from '../../../Spinner';
import { reset } from '../../../../features/teaching/teachingSlice';

function LessonDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { setShowFooter, setNavbarFixed } = useLayout();

  const { lessonId } = useParams();

  // Redux
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.teaching.edit);
  const { isLoading } = useSelector((state) => state.teaching.delete);

  // Context
  const {
    lesson,
    setLesson,
    setSteps,
    setSelectedStep,
    isDirty,
    setIsDirty,
    handleSave,
    title,
    setTitle,
  } = useEditLesson();

  const [lessonActionsMenuAnchor, setLessonActionsMenuAnchor] = useState(null);
  const menuOpen = Boolean(lessonActionsMenuAnchor);

  const handleMenuOpen = (event) => {
    setLessonActionsMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setLessonActionsMenuAnchor(null);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteLessonClick = () => {
    setDeleteDialogOpen(true);
    setLessonActionsMenuAnchor(null);
  };

  const handleRestoreLesson = () => {};

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
    setIsDirty(true);
  }, []);

  useEffect(() => {
    setShowFooter(false);
    setNavbarFixed(true);

    if (course) {
      const lesson = course.chapters
        .map((chapter) => chapter.lessons)
        .flat()
        .find((lesson) => lesson.id === lessonId);

      if (lesson) {
        setLesson({ ...lesson });
        setTitle(lesson.title);
        setSteps([...lesson.lesson_steps]);
        setSelectedStep({ ...lesson.lesson_steps[0] });
      }
    }

    return () => {
      setShowFooter(true);
      setNavbarFixed(false);
      setIsDirty(false);
      dispatch(reset());
    };
  }, [setShowFooter, setNavbarFixed, lessonId]);

  return (
    <Box sx={{ minHeight: '100%' }} component='form' onSubmit={handleSave}>
      <UnsavedChangesPrompt when={isDirty} />

      {isLoading && <Spinner />}

      <Container maxWidth='md'>
        <Typography variant='h4' gutterBottom>
          Lesson Settings
        </Typography>
        {lesson.deleted ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography variant='body1' color='text.secondary' fontStyle='italic'>
              Lesson "{lesson.title}" will be removed from the course on save
            </Typography>
            <Button variant='text' onClick={handleRestoreLesson}>
              Restore
            </Button>
          </Box>
        ) : (
          <Box>
            <TextField
              label='Lesson Title'
              value={title}
              onChange={handleTitleChange}
              required
              sx={{
                marginY: 1,
                width: '100%',
              }}
              InputProps={{
                inputProps: {
                  maxLength: 50,
                },
              }}
              helperText='Max. 50 characters'
            />

            <StepsList />

            <Box mt={2}>
              <GenericStepEdit />
            </Box>
          </Box>
        )}
      </Container>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: isMobile ? 0 : '280px', // 280px is the drawer width
          right: 0,
          padding: 1,
          backgroundColor: 'lightgray',
          zIndex: 100,
        }}
      >
        <Container
          maxWidth='lg'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Menu
            id='lesson-actions-menu'
            anchorEl={lessonActionsMenuAnchor}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'lesson-actions-button',
            }}
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                marginTop: -1, // Adjust this value to increase or decrease the spacing
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: -8,
                  left: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
                overflow: 'visible',
              },
            }}
          >
            <MenuItem onClick={handleDeleteLessonClick}>
              <ListItemIcon>
                <DeleteIcon fontSize='small' />
              </ListItemIcon>
              Delete lesson
            </MenuItem>
          </Menu>

          <DeleteLessonDialog
            open={deleteDialogOpen}
            handleClose={() => setDeleteDialogOpen(false)}
          />

          {isMobile ? (
            <IconButton
              color='primary'
              id='lesson-actions-button'
              aria-controls={menuOpen ? 'lesson-actions-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuOpen}
            >
              <SettingsIcon />
            </IconButton>
          ) : (
            <Button
              startIcon={<SettingsIcon />}
              variant='outlined'
              id='lesson-actions-button'
              aria-controls={menuOpen ? 'lesson-actions-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={menuOpen ? 'true' : undefined}
              onClick={handleMenuOpen}
            >
              Lesson actions
            </Button>
          )}

          <Box display='flex' ml={1}>
            <Button variant='contained' type='submit' sx={{ mr: 1 }}>
              Save
            </Button>
            <Link to={`/teaching/courses/${course.id}/syllabus`}>
              <Button variant='outlined'>Back to syllabus</Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default LessonDetails;
