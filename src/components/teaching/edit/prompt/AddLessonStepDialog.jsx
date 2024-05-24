import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import VideocamIcon from '@mui/icons-material/Videocam';
import QuizIcon from '@mui/icons-material/Quiz';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEditLesson } from '../../../../context/EditLessonContext';
import stepsEditConstants from '../lesson_edit/steps/constants';
import { nanoid } from 'nanoid';

const styles = {
  card: {
    minWidth: '100%',
    elevation: 0,
    borderRadius: 0,
    borderWidth: 0,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
      transition: '0.1s',
    },
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
};

function AddLessonStepDialog({ open, handleClose }) {
  const { steps, setSteps, setIsDirty, setSelectedStep } = useEditLesson();

  const handleAddTextStep = () => {
    const textStep = {
      id: nanoid(),
      order: steps.length + 1,
      text: stepsEditConstants.DEFAULT_TEXT_STEP_CONTENT,
      type: 'text',
    };
    setSteps([...steps, textStep]);
    setSelectedStep(textStep);
    setIsDirty(true);
    handleClose();
  };

  const handleAddVideoStep = () => {
    const videoStep = {
      id: nanoid(),
      order: steps.length + 1,
      title: 'New video step',
      video_file: null,
      type: 'video',
    };
    setSteps([...steps, videoStep]);
    setSelectedStep(videoStep);
    setIsDirty(true);
    handleClose();
  };

  const handleAddQuizStep = () => {
    const quizStep = {
      id: nanoid(),
      order: steps.length + 1,
      question: stepsEditConstants.DEFAULT_QUIZ_STEP_QUESTION,
      explanation: stepsEditConstants.DEFAULT_QUIZ_STEP_EXPLANATION,
      quiz_choices: stepsEditConstants.DEFAULT_QUIZ_STEP_CHOICES,
      type: 'quiz',
      multiple_choice: false,
    };
    setSteps([...steps, quizStep]);
    setSelectedStep(quizStep);
    setIsDirty(true);
    handleClose();
  };

  const handleAddCodeStep = () => {
    const codeStep = {
      id: nanoid(),
      order: steps.length + 1,
      title: 'New code challenge',
      description: stepsEditConstants.CODE_CHALLENGE_DEFAULT_DESCRIPTION,
      language_id: 71, // Python
      initial_code: null,
      proposed_solution: null,
      test_cases: [
        {
          id: nanoid(),
          input: 'MTAgNQ==',
          expected_output: 'MTU=',
        },
      ],
      type: 'codechallenge',
    };
    setSteps([...steps, codeStep]);
    setSelectedStep(codeStep);
    setIsDirty(true);
    handleClose();
  };

  const handleAddSortingStep = () => {
    const sortingStep = {
      id: nanoid(),
      order: steps.length + 1,
      title: 'New sorting problem',
      statement: stepsEditConstants.DEFAULT_SORTING_PROBLEM_STATEMENT,
      options: stepsEditConstants.DEFAULT_SORTING_PROBLEM_OPTIONS,
      type: 'sorting_problem',
    };
    setSteps([...steps, sortingStep]);
    setSelectedStep(sortingStep);
    setIsDirty(true);
    handleClose();
  };

  const handleAddTextProblemStep = () => {
    const textProblem = {
      id: nanoid(),
      order: steps.length + 1,
      title: 'New text problem',
      statement: stepsEditConstants.DEFAULT_SORTING_PROBLEM_STATEMENT,
      correct_answer: '',
      case_sensitive: true,
      allow_regex: false,
      type: 'text_problem',
    };
    setSteps([...steps, textProblem]);
    setSelectedStep(textProblem);
    setIsDirty(true);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      fullWidth
      maxWidth='md'
    >
      <DialogTitle id='alert-dialog-title' component='div'>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant='h4' textAlign='center' gutterBottom>
          Select step type
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <Card sx={styles.card} variant='outlined' onClick={handleAddTextStep}>
              <CardContent sx={styles.cardContent}>
                <FormatAlignLeftIcon />
                <Box>
                  <Typography variant='subtitle1'>Text</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Formatted text with images, code blocks and more
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Divider light />
          </Grid>

          <Grid item xs={6}>
            <Card sx={styles.card} variant='outlined' onClick={handleAddVideoStep}>
              <CardContent sx={styles.cardContent}>
                <VideocamIcon />
                <Box>
                  <Typography variant='subtitle1'>Video</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Upload your video
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Divider light />
          </Grid>

          <Grid item xs={6}>
            <Card sx={styles.card} variant='outlined' onClick={handleAddQuizStep}>
              <CardContent sx={styles.cardContent}>
                <QuizIcon />
                <Box>
                  <Typography variant='subtitle1'>Multiple Choice Quiz</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Select all correct options from the list
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Divider light />
          </Grid>

          <Grid item xs={6}>
            <Card sx={styles.card} variant='outlined' onClick={handleAddCodeStep}>
              <CardContent sx={styles.cardContent}>
                <CodeIcon />
                <Box>
                  <Typography variant='subtitle1'>Code Challenge</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Write a program, test using stdin → stdout
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            <Divider light />
          </Grid>

          <Grid item xs={6}>
            <Card sx={styles.card} variant='outlined' onClick={handleAddSortingStep}>
              <CardContent sx={styles.cardContent}>
                <SwapVertIcon />
                <Box>
                  <Typography variant='subtitle1'>Sorting Problem</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Sort a given list
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={styles.card} variant='outlined' onClick={handleAddTextProblemStep}>
              <CardContent sx={styles.cardContent}>
                <EditNoteIcon />
                <Box>
                  <Typography variant='subtitle1'>Text Problem</Typography>
                  <Typography variant='body2' color='textSecondary'>
                    Write text answer
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AddLessonStepDialog;
