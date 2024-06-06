import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HtmlContent from '../../../HtmlContent';
import { useDispatch } from 'react-redux';
import ReplayIcon from '@mui/icons-material/Replay';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';
import learningService from '../../../../features/learning/learningService';
import { completeLessonStep } from '../../../../features/learning/learningSlice';
import { toast } from 'react-toastify';

function TextProblemStep({ step }) {
  const [answer, setAnswer] = useState('');
  const [resultCorrect, setResultCorrect] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetTextProblem = async () => {
      if (step.completed) {
        try {
          setResultCorrect(true);
          setLoading(true);
          const problem = await learningService.getTextProblem(step.id);
          if (!problem.allow_regex) {
            setAnswer(problem.correct_answer);
          }
        } catch (error) {
          console.error('Failed to get text problem:', error);
        }
        setLoading(false);
      }
    };

    fetTextProblem();
  }, [step.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!answer) {
      toast.error('Please write an answer.');
      return;
    }

    setSubmitting(true);
    setResultCorrect(null);

    try {
      const result = await learningService.submitTextProblem(step.id, { answer });
      const correct = result.detail === 'Correct answer';
      setResultCorrect(correct);
      if (correct && !step.completed) {
        dispatch(completeLessonStep(step.id));
      }
    } catch (error) {
      console.error('Failed to submit text problem:', error);
      toast.error('Failed to submit text problem. Please try again.');
    }

    setSubmitting(false);
  };

  const handleSolveAgainClick = () => {
    setAnswer('');
    setResultCorrect(null);
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='h4' gutterBottom>
        {step.title}
      </Typography>

      <HtmlContent html={step.statement} />

      <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
        Write text answer
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
        <TextField
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          id='text-answer'
          label='Answer'
          required
          multiline
          fullWidth
          variant='outlined'
          disabled={resultCorrect !== null}
          placeholder='Write your answer here...'
          sx={{ my: 2 }}
          minRows={2}
        />
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

export default TextProblemStep;
