import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import LessonCard from './LessonCard';

function ModuleCard({ chapter, index }) {
  const totalLessons = chapter.lessons.length;
  const completedLessons = chapter.lessons.filter((lesson) => lesson.completed).length;

  return (
    <Box mb={4}>
      <Card
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 0,
          boxShadow: 0.5,
          borderWidth: 0.1,
          borderColor: 'grey.300',
          borderStyle: 'solid',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '0.5%',
              height: '54px',
              background: (theme) =>
                chapter.completed ? theme.palette.secondary.main : 'lightgray',
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
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' fontWeight={1} color='text.secondary'>
                {index}.
              </Typography>
              <Typography variant='h5' sx={{ ml: 1 }}>
                {chapter.title}
              </Typography>
            </Box>

            <Typography variant='body1' color='text.secondary' sx={{ mr: 1 }}>
              {completedLessons}/{totalLessons}
            </Typography>
          </Box>
        </Box>
      </Card>
      {chapter.lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          moduleIndex={index}
          totalLessons={chapter.lessons.length}
        />
      ))}
    </Box>
  );
}

export default ModuleCard;
