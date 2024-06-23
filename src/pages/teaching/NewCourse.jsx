import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCourse } from '../../features/teaching/teachingSlice';
import Spinner from '../../components/layout/Spinner';

function NewCourse() {
  const [courseName, setCourseName] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isSuccess, isError, message, course, isLoading } = useSelector(
    (state) => state.teaching.create
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (courseName.length > 100) {
      toast.error('Course name is too long');
      return;
    }

    dispatch(createCourse({ course: { title: courseName }, isImageUrl: true }));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/teaching/courses/${course.id}`);
      toast.success('Course created successfully', {
        position: 'bottom-center',
      });
    }

    if (isError) {
      toast.error(message, {
        position: 'bottom-center',
      });
    }
  }, [isSuccess, isError, course, navigate, message]);

  return (
    <Container component='main' maxWidth='md'>
      {isLoading && <Spinner />}
      <Typography variant='h3' gutterBottom mt={2}>
        Create a new course
      </Typography>
      <Box
        sx={{
          marginTop: 4,
        }}
        component='form'
        onSubmit={handleSubmit}
      >
        <TextField
          label='Course title'
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          sx={{
            width: '100%',
          }}
          helperText='Max. 100 characters'
        />

        <Button variant='contained' type='submit' sx={{ marginTop: 4, padding: 1.75 }}>
          Create Course
        </Button>

        <Typography variant='body2' mt={2} component='p'>
          Start working on the draft of your course after creating it.
        </Typography>
      </Box>
    </Container>
  );
}

export default NewCourse;
