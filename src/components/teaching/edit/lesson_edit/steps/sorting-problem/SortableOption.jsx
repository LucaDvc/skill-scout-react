import React, { useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Card, CardContent, IconButton, TextField } from '@mui/material';
import { useEditLesson } from '../../../../../../context/EditLessonContext';

export default function SortableOption(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const { option, index } = props;

  const { setSelectedStep, setIsDirty } = useEditLesson();

  useEffect(() => {
    setSelectedStep((step) => {
      const options = step.options.map((o) => {
        if (o.id === option.id) {
          return { ...o, correct_order: index + 1 };
        }
        return o;
      });
      return { ...step, options };
    });
  }, [index]);

  const handleTextChange = (event) => {
    const { value } = event.target;
    setSelectedStep((step) => {
      const options = step.options.map((o) => {
        if (o.id === option.id) {
          return { ...o, text: value };
        }
        return o;
      });
      return { ...step, options };
    });
    setIsDirty(true);
  };

  const handleDelete = () => {
    setSelectedStep((step) => {
      const options = step.options.filter((o) => o.id !== option.id);
      return { ...step, options };
    });
    setIsDirty(true);
  };

  return (
    <Card
      sx={{
        minWidth: '100%',
        marginY: 2,
        borderRadius: 1,
        boxShadow: 0.5,
        borderWidth: 0.1,
        borderColor: 'grey.300',
        borderStyle: 'solid',
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      ref={setNodeRef}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
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
      </CardContent>
    </Card>
  );
}
