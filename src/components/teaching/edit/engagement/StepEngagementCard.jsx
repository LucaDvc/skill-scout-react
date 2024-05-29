import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector } from 'react-redux';
import { transform } from 'lodash-es';

function StepEngagementCard({ step }) {
  const { course } = useSelector((state) => state.teaching.edit);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        minWidth: '100%',
        marginY: 2,
        borderRadius: 0,
        boxShadow: 0.5,
        borderWidth: 0.1,
        borderColor: 'grey.300',
        borderStyle: 'solid',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s',
          cursor: 'pointer',
        },
      }}
      onClick={() =>
        navigate(`/teaching/edit-lessons/${course.id}/lessons/${step.lesson_id}`)
      }
    >
      <CardContent>
        <Link
          to={`/teaching/edit-lessons/${course.id}/lessons/${step.lesson_id}`}
          className='link-underline-hover'
        >
          <Typography fontSize={17} component='span'>
            Step {step.lesson_step_order}
          </Typography>
        </Link>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          Type: {step.lesson_step_type}
        </Typography>
        <Box display='flex' alignItems='center' justifyContent='space-evenly' mb={1}>
          <Box display='flex' alignItems='center'>
            <TimelapseIcon sx={{ mr: 1 }} fontSize='small' />
            <Typography variant='body2'>
              Average time spent: {step.average_time_spent.toFixed(1)} min
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <VisibilityIcon sx={{ mr: 1 }} fontSize='small' />
            <Typography variant='body2'>Unique views: {step.learners_count}</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <HistoryIcon sx={{ mr: 1 }} fontSize='small' />
            <Typography variant='body2'>
              Last accessed: {new Date(step.last_accessed).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StepEngagementCard;
