import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PublishIcon from '@mui/icons-material/Publish';
import PeopleIcon from '@mui/icons-material/People';
import { useSelector } from 'react-redux';

const getSuccessRateColor = (rate) => {
  if (rate >= 80) return 'green';
  if (rate >= 50) return 'orange';
  return 'red';
};

function AssessmentStepPerformanceCard({ step }) {
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
            Step {step.step_order}
          </Typography>
        </Link>
        <Typography variant='body2' color='textSecondary' gutterBottom>
          Type: {step.step_type}
        </Typography>
        <Box display='flex' alignItems='center' justifyContent='space-evenly' mb={1}>
          <Box display='flex' alignItems='center'>
            <PeopleIcon sx={{ mr: 1 }} fontSize='small' />
            <Typography variant='body2'>Learners: {step.total_learners}</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <PublishIcon sx={{ mr: 1 }} fontSize='small' />
            <Typography variant='body2'>Attempts: {step.total_attempts}</Typography>
          </Box>

          <Box display='flex' alignItems='center'>
            <CheckCircleIcon sx={{ mr: 1 }} fontSize='small' />
            <Typography variant='body2' sx={{ mr: 0.5 }}>
              Success:
            </Typography>
            <Typography variant='body2' color={getSuccessRateColor(step.success_rate)}>
              {step.success_rate.toFixed(2)}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AssessmentStepPerformanceCard;
