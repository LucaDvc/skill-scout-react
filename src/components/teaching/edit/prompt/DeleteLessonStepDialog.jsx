import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useEditLesson } from '../../../../context/EditLessonContext';

function DeleteLessonStepDialog({ open, handleClose }) {
  const { steps, setSteps, selectedStep, setSelectedStep } = useEditLesson();

  const handleDelete = () => {
    const newSteps = steps.filter((step) => step.id !== selectedStep.id);
    setSteps(newSteps);
    if (newSteps.length > 0) {
      setSelectedStep(newSteps[0]);
    } else {
      setSelectedStep(null);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to delete this lesson step?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          After saving the lesson, this step will be permanently deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant='outlined' color='error'>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteLessonStepDialog;
