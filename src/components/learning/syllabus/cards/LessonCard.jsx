import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function LessonCard({ lesson, moduleIndex }) {
  const totalLessonSteps = lesson.lesson_steps.length;
  const completedLessonSteps = lesson.lesson_steps.filter(
    (step) => step.completed
  ).length;

  return (
    <Link to={`../lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          marginLeft: '5%',
          minWidth: '95%',
          overflow: 'hidden',
          borderRadius: 0,
          boxShadow: 0.5,
          borderWidth: 0.1,
          borderColor: 'grey.300',
          borderStyle: 'solid',
          borderTop: 'none',
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.2s',
            cursor: 'pointer',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '0.5%',
              height: '54px',
              background: (theme) =>
                lesson.completed ? theme.palette.secondary.main : 'lightgray',
            }}
          ></Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              margin: 1,
            }}
          >
            <Box
              sx={{
                marginLeft: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='body1'
                color='text.secondary'
                component='span'
              >{`${moduleIndex}.${lesson.order}`}</Typography>
              <Typography variant='body1' component='span' fontSize={16.5} sx={{ ml: 1 }}>
                {lesson.title}
              </Typography>
            </Box>
            <Typography variant='body2' color='text.secondary' sx={{ mr: 1 }}>
              {completedLessonSteps}/{totalLessonSteps}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}

export default LessonCard;
