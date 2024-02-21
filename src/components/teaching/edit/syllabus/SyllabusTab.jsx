import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModuleCard from './cards/ModuleCard';
import { SyllabusContext } from '../../../../context/SyllabusContext';
import { nanoid } from 'nanoid';
import {
  reset,
  updateCourse,
} from '../../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';
import ReactRouterPrompt from 'react-router-prompt';
import { isEqual } from 'lodash-es';

function SyllabusTab() {
  const STD_MARGIN_TOP = 4;

  // Toast
  const toastId = useRef(null);

  // Redux
  const { course, isSuccess, isError, message } = useSelector(
    (state) => state.teaching.edit
  );
  const dispatch = useDispatch();

  const { chapters, setChapters } = useContext(SyllabusContext);

  useEffect(() => {
    if (course) {
      setChapters([...course.chapters]);
    }
  }, [course, setChapters]);

  const handleNewModuleClick = () => {
    setChapters([
      ...chapters,
      {
        id: nanoid(),
        title: 'New Module',
        lessons: [],
      },
    ]);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const updatedChapters = chapters
      .filter((chapter) => !chapter.deleted)
      .map((chapter) => {
        const lessonsToKeep = chapter.lessons.filter(
          (lesson) => !lesson.deleted
        );

        const updatedLessons = lessonsToKeep.map((lesson, index) => ({
          ...lesson,
          order: index + 1,
        }));

        return {
          ...chapter,
          lessons: updatedLessons,
        };
      });

    const updatedCourse = {
      ...course,
      category: course.category.id,
      chapters: updatedChapters,
    };

    dispatch(updateCourse({ id: course.id, updatedCourse }));

    toastId.current = toast.loading('Saving changes...', {
      autoClose: false,
      isLoading: true,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastId.current, {
        render: 'Course updated successfully!',
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        onClose: () => {
          dispatch(reset());
        },
      });
    }

    if (isError) {
      toast.update(toastId.current, {
        render: message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        onClose: () => {
          dispatch(reset());
        },
      });
    }
  }, [isSuccess, isError, message]);

  const [promptOpen, setPromptOpen] = useState(false);

  return (
    course && (
      <Box
        my={2}
        component='form'
        onSubmit={handleSubmit}
        sx={{ minHeight: '100vh' }}
      >
        <Typography variant='h3' mb={STD_MARGIN_TOP}>
          Course content
        </Typography>

        <ReactRouterPrompt when={!isEqual(chapters, course.chapters)}>
          {({ isActive, onConfirm, onCancel }) => {
            return (
              <Dialog
                open={isActive}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant='subtitle1'>Unsaved changes</Typography>
                    <IconButton>
                      <CloseIcon onClick={onCancel} />
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    {
                      'You have unsaved changes. Are you sure you want to leave?'
                    }
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={onCancel}
                    variant='outlined'
                    color='secondary'
                    autoFocus
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={onConfirm}
                    variant='contained'
                    color='primary'
                  >
                    Discard Changes
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }}
        </ReactRouterPrompt>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {chapters.length === 0 ? (
            <>
              <Typography variant='body1' color='text.secondary'>
                There are no lessons in this course yet.
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Add a module to add lessons
              </Typography>
            </>
          ) : (
            chapters.map((chapter, index) => (
              <Box
                sx={{ minWidth: '100%', marginTop: STD_MARGIN_TOP }}
                key={chapter.id}
              >
                <ModuleCard
                  chapter={chapter}
                  index={index + 1}
                  key={chapter.id}
                />
              </Box>
            ))
          )}

          <Button
            sx={{ marginTop: STD_MARGIN_TOP }}
            startIcon={<AddIcon fontSize='large' />}
            p={4}
            variant='outlined'
            color='secondary'
            onClick={handleNewModuleClick}
          >
            <Typography variant='body1'>New Module</Typography>
          </Button>

          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{ width: '35%', marginTop: STD_MARGIN_TOP * 3 }}
          >
            <Typography variant='h5'>Save</Typography>
          </Button>
        </Box>
      </Box>
    )
  );
}

export default SyllabusTab;
