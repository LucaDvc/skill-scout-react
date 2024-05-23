import React, { useState } from 'react';
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
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
import SortableOption from './SortableOption';

function OptionsList() {
  const { selectedStep, setSelectedStep, setIsDirty } = useEditLesson();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedStep((step) => {
        let options = [...step.options];
        const oldIndex = options.findIndex((option) => option.id === active.id);
        const newIndex = options.findIndex((option) => option.id === over.id);

        options = arrayMove(options, oldIndex, newIndex);

        return { ...step, options: options };
      });
    }

    setIsDirty(true);
  }

  const addOption = () => {
    if (selectedStep.options.length >= 10) return; // Limit to 10 options
    const options = [
      ...selectedStep.options,
      { id: nanoid(), text: '', correct_order: selectedStep.options.length + 1 },
    ];
    setSelectedStep({ ...selectedStep, options });
    setIsDirty(true);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={selectedStep.options}
          strategy={verticalListSortingStrategy}
        >
          {selectedStep.options.map((option, index) => (
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
      <Button
        startIcon={<AddIcon />}
        variant='contained'
        color='secondary'
        onClick={addOption}
      >
        Add option
      </Button>
    </>
  );
}

export default OptionsList;
