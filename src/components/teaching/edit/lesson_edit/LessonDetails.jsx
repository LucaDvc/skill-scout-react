import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../../context/LayoutContext';
import { useSelector } from 'react-redux';
import StepsList from './StepsList';

function LessonDetails() {
  const { lessonId } = useParams();

  const { setShowFooter, setNavbarFixed } = useLayout();

  const { course } = useSelector((state) => state.teaching.edit);

  const [lesson, setLesson] = useState({});
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  const handleRestoreLesson = () => {};

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setShowFooter(false);
    setNavbarFixed(true);

    if (course) {
      const lesson = course.chapters
        .map((chapter) => chapter.lessons)
        .flat()
        .find((lesson) => lesson.id === lessonId);

      if (lesson) {
        setLesson(lesson);
        setTitle(lesson.title);
        setSteps([...lesson.lesson_steps]);
        setSelectedStep(lesson.lesson_steps[0]);
      }
    }

    return () => {
      setShowFooter(true);
      setNavbarFixed(false);
    };
  }, [setShowFooter, setNavbarFixed, lessonId]);

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100dvh' }}>
      <Container sx={{ pt: 4 }} maxWidth='md'>
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
              onChange={handleChange}
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

            <StepsList
              steps={steps}
              setSteps={setSteps}
              selectedStep={selectedStep}
              setSelectedStep={setSelectedStep}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default LessonDetails;
