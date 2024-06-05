import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import VideocamIcon from '@mui/icons-material/Videocam';
import QuizIcon from '@mui/icons-material/Quiz';
import CodeIcon from '@mui/icons-material/Code';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import EditNoteIcon from '@mui/icons-material/EditNote';

function StepListCard({ step }) {
  const { courseId, lessonId, stepOrder } = useParams();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/learning/course/${courseId}/lessons/${lessonId}/step/${step.order}`);
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        backgroundColor: step.completed ? 'secondary.main' : 'action.disabledBackground',
        borderWidth: stepOrder == step.order ? 2 : 0,
        borderColor: 'primary.light',
        borderStyle: 'solid',
        width: 36,
        height: 36,
        borderRadius: 1,
        '&:hover': {
          cursor: 'pointer',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {step.type === 'text' && (
        <FormatAlignLeftIcon sx={{ color: 'white' }} fontSize='small' />
      )}
      {step.type === 'video' && <VideocamIcon sx={{ color: 'white' }} fontSize='small' />}
      {step.type === 'quiz' && <QuizIcon sx={{ color: 'white' }} fontSize='small' />}
      {step.type === 'codechallenge' && (
        <CodeIcon sx={{ color: 'white' }} fontSize='small' />
      )}
      {step.type === 'sorting_problem' && (
        <SwapVertIcon sx={{ color: 'white' }} fontSize='small' />
      )}
      {step.type === 'text_problem' && (
        <EditNoteIcon sx={{ color: 'white' }} fontSize='small' />
      )}
    </Card>
  );
}

export default StepListCard;
