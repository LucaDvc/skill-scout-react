import { Box, Card, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { SortableStepCard } from './SortableStepCard';

function StepsList({ steps, setSteps, selectedStep, setSelectedStep }) {
  const [hover, setHover] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSteps((steps) => {
        const oldIndex = steps.findIndex((step) => step.id === active.id);
        const newIndex = steps.findIndex((step) => step.id === over.id);
        steps[oldIndex] = { ...steps[oldIndex], order: newIndex + 1 };
        steps[newIndex] = { ...steps[newIndex], order: oldIndex + 1 };

        return arrayMove(steps, oldIndex, newIndex);
      });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={steps} strategy={horizontalListSortingStrategy}>
          {steps.map((step) => (
            <SortableStepCard
              key={step.id}
              id={step.id}
              step={step}
              onClick={() => setSelectedStep(step)}
              selectedStep={selectedStep}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Tooltip title='Add new step' placement='right' arrow>
        <Card
          onClick={() => console.log('Add new step')}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            backgroundColor: '#d4f1ff',
            width: 64,
            height: 64,
            mt: 3,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: '#1F60D3',
              transition: '0.1s',
              cursor: 'pointer',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4' sx={{ color: hover ? '#ffffff' : '#1F60D3' }}>
            +
          </Typography>
        </Card>
      </Tooltip>
    </div>
  );
}

export default StepsList;
