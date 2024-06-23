import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import HtmlContent from '../../../layout/HtmlContent';
import learningService from '../../../../features/learning/learningService';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from 'react-redux';
import { completeLessonStep } from '../../../../features/learning/learningSlice';
import ReplayIcon from '@mui/icons-material/Replay';

function QuizStep({ step }) {
  const [selectedChoices, setSelectedChoices] = useState(
    step.quiz_choices.reduce((acc, choice) => {
      acc[choice.id] = false;
      return acc;
    }, {})
  );

  const [resultCorrect, setResultCorrect] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (step.completed) {
        try {
          setLoading(true);
          setResultCorrect(true);
          const quiz = await learningService.getQuizStep(step.id);
          setSelectedChoices(
            quiz.quiz_choices.reduce((acc, choice) => {
              acc[choice.id] = choice.correct;
              return acc;
            }, {})
          );
        } catch (error) {
          console.error('Failed to get quiz:', error);
        }
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [step.id]);

  const handleChange = (event) => {
    if (step.multiple_choice) {
      setSelectedChoices({
        ...selectedChoices,
        [event.target.id]: event.target.checked,
      });
    } else {
      // uncheck all other choices and check/uncheck the selected choice
      setSelectedChoices(
        Object.keys(selectedChoices).reduce((acc, choiceId) => {
          acc[choiceId] = choiceId === event.target.id ? event.target.checked : false;
          return acc;
        }, {})
      );
    }
  };

  const handleSolveAgainClick = () => {
    setSelectedChoices(
      step.quiz_choices.reduce((acc, choice) => {
        acc[choice.id] = false;
        return acc;
      }, {})
    );
    setResultCorrect(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResultCorrect(null);

    const selectedChoiceIds = Object.keys(selectedChoices).filter(
      (choiceId) => selectedChoices[choiceId]
    );

    if (selectedChoiceIds.length === 0) {
      toast.error('Please select at least one option.');
      setSubmitting(false);
      return;
    }

    // submit quiz answers to the server
    const request = { quiz_choices: selectedChoiceIds };
    try {
      const result = await learningService.submitQuiz(step.id, request);
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

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <HtmlContent html={step.question} />
      <Box mt={4}>
        <Typography variant='h6' gutterBottom>
          {step.multiple_choice
            ? 'Select all correct options from the list:'
            : 'Select the correct option from the list:'}
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
          <CircularProgress />
        ) : (
          <FormGroup>
            {step.quiz_choices.map((choice) => (
              <FormControlLabel
                key={choice.id}
                control={
                  <Checkbox
                    checked={selectedChoices[choice.id]}
                    onChange={handleChange}
                    id={choice.id}
                  />
                }
                label={choice.text}
                sx={{ display: 'inline' }}
              />
            ))}
          </FormGroup>
        )}

        {resultCorrect && (
          <Box
            sx={{
              backgroundColor: 'success.lighter',
              paddingX: 2,
              paddingY: 1,
              borderRadius: 1,
              my: 2,
              display: 'flex',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '5px',
                backgroundColor: 'success.light',
                overflow: 'hidden',
              }}
            ></Box>
            <HtmlContent html={step.explanation} />
          </Box>
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
    </Box>
  );
}

export default QuizStep;
