import { Backdrop, Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModuleCard from './cards/ModuleCard';
import { SyllabusContext } from '../../../../context/SyllabusContext';
import { nanoid } from 'nanoid';
import { reset, updateCourse } from '../../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';
import { isEqual } from 'lodash-es';
import UnsavedChangesPrompt from '../prompt/UnsavedChangesPrompt';

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
  const [loading, setLoading] = useState(false);

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

    toastId.current = toast.loading('Saving changes...', {
      autoClose: false,
      isLoading: true,
    });

    setLoading(true);

    const updatedChapters = chapters
      .filter((chapter) => !chapter.deleted)
      .map((chapter) => {
        const lessonsToKeep = chapter.lessons.filter((lesson) => !lesson.deleted);

        const updatedLessons = lessonsToKeep.map((lesson, index) => ({
          id: lesson.id,
          title: lesson.title,
          order: index + 1,
        }));

        return {
          ...chapter,
          lessons: updatedLessons,
        };
      });

    const updatedCourse = {
      chapters: updatedChapters,
    };

    dispatch(updateCourse({ id: course.id, updatedCourse }));
  };

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
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
      setLoading(false);
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

  return (
    course && (
      <Box my={2} component='form' onSubmit={handleSubmit} sx={{ minHeight: '100vh' }}>
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} />
        <Typography variant='h3' mb={STD_MARGIN_TOP}>
          Course content
        </Typography>

        <UnsavedChangesPrompt when={!isEqual(chapters, course.chapters)} />

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
              <Box sx={{ minWidth: '100%', marginTop: STD_MARGIN_TOP }} key={chapter.id}>
                <ModuleCard chapter={chapter} index={index + 1} key={chapter.id} />
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
