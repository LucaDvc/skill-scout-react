import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Typography } from '@mui/material';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import VideocamIcon from '@mui/icons-material/Videocam';
import QuizIcon from '@mui/icons-material/Quiz';
import CodeIcon from '@mui/icons-material/Code';

export function SortableStepCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });
  const { step, selectedStep, onClick } = props;

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Typography variant='body2' sx={{ color: 'action.disabled' }}>
        {step.order}
      </Typography>
      <Card
        onClick={onClick}
        sx={{
          backgroundColor:
            selectedStep.id === step.id ? 'secondary.main' : 'action.disabledBackground',
          width: 64,
          height: 64,
          borderRadius: 1,
          '&:hover': {
            backgroundColor:
              selectedStep.id === step.id ? 'success.main' : 'action.disabled',
            cursor: 'pointer',
            transition: '0.1s',
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {step.type === 'text' && <FormatAlignLeftIcon sx={{ color: 'white' }} />}
        {step.type === 'video' && <VideocamIcon sx={{ color: 'white' }} />}
        {step.type === 'quiz' && <QuizIcon sx={{ color: 'white' }} />}
        {step.type === 'codechallenge' && <CodeIcon sx={{ color: 'white' }} />}
      </Card>
    </div>
  );
}
