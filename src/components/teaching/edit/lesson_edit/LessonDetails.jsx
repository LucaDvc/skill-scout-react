import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../../context/LayoutContext';
import { useSelector } from 'react-redux';
import StepsList from './StepsList';
import GenericStepEdit from './steps/GenericStepEdit';
import UnsavedChangesPrompt from '../prompt/UnsavedChangesPrompt';
import { useEditLesson } from '../../../../context/EditLessonContext';

function LessonDetails() {
  const { lessonId } = useParams();

  const { setShowFooter, setNavbarFixed } = useLayout();

  const { course } = useSelector((state) => state.teaching.edit);
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
    };
  }, [setShowFooter, setNavbarFixed, lessonId]);

  return (
    <Box sx={{ minHeight: '100%' }}>
      <UnsavedChangesPrompt when={isDirty} />

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
                margin: 1,
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
          width: '100%',
          padding: 1,
          backgroundColor: 'gray',
        }}
      >
        <Button variant='contained' onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default LessonDetails;
