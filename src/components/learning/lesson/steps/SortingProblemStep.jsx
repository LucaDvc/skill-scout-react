import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import HtmlContent from '../../../HtmlContent';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableOption from './SortableOption';

function SortingProblemStep({ step }) {
  const [options, setOptions] = useState(step.options);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOptions((prevOptions) => {
        const oldIndex = prevOptions.findIndex((option) => option.id === active.id);
        const newIndex = prevOptions.findIndex((option) => option.id === over.id);
        return arrayMove(prevOptions, oldIndex, newIndex);
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the sorted options
    const request = options.map((option, index) => ({ ...option, order: index + 1 }));
    console.log(request);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='h4' gutterBottom>
        {step.title}
      </Typography>

      <HtmlContent html={step.statement} />

      <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
        Sort the following options:
      </Typography>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={options} strategy={verticalListSortingStrategy}>
          {options.map((option, index) => (
            <SortableOption
              key={option.id}
              id={option.id}
              option={option}
              index={index}
              handle
            />
          ))}
        </SortableContext>
      </DndContext>

      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </Box>
  );
}

export default SortingProblemStep;
