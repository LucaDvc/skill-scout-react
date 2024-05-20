import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Card, Checkbox, IconButton, Radio, TextField } from '@mui/material';
import { useEditLesson } from '../../../../../../context/EditLessonContext';

export default function SortableQuizOption(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const { option } = props;

  const { selectedStep, setSelectedStep, setIsDirty } = useEditLesson();

  const handleTextChange = (event) => {
    const { value } = event.target;
    setSelectedStep((step) => {
      const options = step.quiz_choices.map((o) => {
        if (o.id === option.id) {
          return { ...o, text: value };
        }
        return o;
      });
      return { ...step, quiz_choices: options };
    });
    setIsDirty(true);
  };

  const handleDelete = () => {
    setSelectedStep((step) => {
      const options = step.quiz_choices.filter((o) => o.id !== option.id);
      return { ...step, quiz_choices: options };
    });
    setIsDirty(true);
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedStep((step) => {
      const options = step.quiz_choices.map((o) => {
        if (o.id === value) {
          return { ...o, correct: true };
        } else {
          return { ...o, correct: false };
        }
      });
      return { ...step, quiz_choices: options };
    });
    setIsDirty(true);
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setSelectedStep((step) => {
      const options = step.quiz_choices.map((o) => {
        if (o.id === option.id) {
          return { ...o, correct: checked };
        }
        return o;
      });
      return { ...step, quiz_choices: options };
    });
    setIsDirty(true);
  };

  return (
    <Card
      sx={{
        minWidth: '100%',
        marginY: 2,
        padding: 0.5,
        borderRadius: 1,
        boxShadow: 0.5,
        borderWidth: 0.1,
        borderColor: 'grey.300',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      ref={setNodeRef}
    >
      <IconButton
        {...listeners}
        {...attributes}
        disableRipple
        aria-label='option drag handle'
        sx={{
          '&:hover': {
            cursor: 'grab',
          },
        }}
      >
        <DragIndicatorIcon />
      </IconButton>

      {!selectedStep.multiple_choice ? (
        <Radio checked={option.correct} onChange={handleRadioChange} value={option.id} />
      ) : (
        <Checkbox checked={option.correct} onChange={handleCheckboxChange} />
      )}

      <TextField
        variant='standard'
        value={option.text}
        fullWidth
        sx={{ marginX: 1 }}
        onChange={handleTextChange}
      />

      <IconButton aria-label='delete option' onClick={handleDelete}>
        <CloseIcon />
      </IconButton>
    </Card>
  );
}
