import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import { LoadingButton } from '@mui/lab';
import learningService from '../../../../features/learning/learningService';
import { useDispatch } from 'react-redux';
import { completeLessonStep } from '../../../../features/learning/learningSlice';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function SortingProblemStep({ step }) {
  const [options, setOptions] = useState(shuffle([...step.options]));

  const [resultCorrect, setResultCorrect] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchSortingProblem = async () => {
      if (step.completed) {
        setResultCorrect(true);
        try {
          setLoading(true);
          const problem = await learningService.getSortingProblem(step.id);
          setOptions([...problem.options]);
        } catch (error) {
          console.error('Failed to get sorting problem:', error);
        }
        setLoading(false);
      }
    };

    fetchSortingProblem();
  }, [step.id]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const request = { ordered_options: options.map((option) => option.id) };
    try {
      const result = await learningService.submitSortingProblem(step.id, request);
      const correct = result.detail === 'Correct answer';
      setResultCorrect(correct);
      if (correct && !step.completed) {
        dispatch(completeLessonStep(step.id));
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      toast.error('Failed to submit quiz. Please try again.');
    }
    setSubmitting(false);
  };

  const handleSolveAgainClick = () => {
    setOptions(shuffle([...step.options]));
    setResultCorrect(null);
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

      {resultCorrect !== null && (
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          {resultCorrect ? (
            <CheckCircleIcon color='success' sx={{ mr: 1 }} />
          ) : (
            <CancelIcon color='error' sx={{ mr: 1 }} />
          )}
          <Typography>
            {resultCorrect ? 'Correct! Well done!' : 'Incorrect answer.'}
          </Typography>
        </Box>
      )}

      {loading ? (
        <CircularProgress sx={{ display: 'block', my: 2 }} />
      ) : (
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
      )}

      {resultCorrect !== null ? (
        <Button
          variant='contained'
          color='primary'
          startIcon={<ReplayIcon />}
          onClick={handleSolveAgainClick}
        >
          {resultCorrect ? 'Solve again' : 'Try again'}
        </Button>
      ) : (
        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          loading={submitting}
          sx={{ marginTop: 2, paddingX: 4 }}
          loadingIndicator='Submitting...'
        >
          Submit
        </LoadingButton>
      )}
    </Box>
  );
}

export default SortingProblemStep;
