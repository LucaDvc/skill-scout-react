import { Card, Tooltip, Typography } from '@mui/material';
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
import { useEditLesson } from '../../../../context/EditLessonContext';
import AddLessonStepDialog from '../prompt/AddLessonStepDialog';

function StepsList() {
  const { setIsDirty, steps, setSteps } = useEditLesson();
  const [hover, setHover] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.1,
      },
    })
  );

  const [addStepDialogOpen, setAddStepDialogOpen] = useState(false);

  const handleAddStep = () => {
    setAddStepDialogOpen(true);
    setIsDirty(true);
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setSteps((steps) => {
        const oldIndex = steps.findIndex((step) => step.id === active.id);
        const newIndex = steps.findIndex((step) => step.id === over.id);

        setIsDirty(true);
        return arrayMove(steps, oldIndex, newIndex);
      });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
      <AddLessonStepDialog
        open={addStepDialogOpen}
        handleClose={() => setAddStepDialogOpen(false)}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={steps} strategy={horizontalListSortingStrategy}>
          {steps.map((step, index) => (
            <SortableStepCard key={step.id} id={step.id} step={step} index={index} />
          ))}
        </SortableContext>
      </DndContext>
      {steps.length < 12 && (
        <Tooltip title='Add new step' placement='right' arrow>
          <Card
            onClick={handleAddStep}
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
      )}
    </div>
  );
}

export default StepsList;
