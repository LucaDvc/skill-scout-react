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
import SortableQuizOption from './SortableQuizOption';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { nanoid } from 'nanoid';
function OptionsTab() {
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
        let options = [...step.quiz_choices];
        const oldIndex = options.findIndex((option) => option.id === active.id);
        const newIndex = options.findIndex((option) => option.id === over.id);

        options = arrayMove(options, oldIndex, newIndex);

        return { ...step, quiz_choices: options };
      });
    }

    setIsDirty(true);
  }

  const addOption = () => {
    if (selectedStep.quiz_choices.length > 10) return; // Limit to 10 options
    const options = [
      ...selectedStep.quiz_choices,
      { id: nanoid(), text: '', correct: false },
    ];
    setSelectedStep({ ...selectedStep, quiz_choices: options });
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
          items={selectedStep.quiz_choices}
          strategy={verticalListSortingStrategy}
        >
          {selectedStep.quiz_choices.map((option, index) => (
            <SortableQuizOption key={option.id} id={option.id} option={option} handle />
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

export default OptionsTab;
