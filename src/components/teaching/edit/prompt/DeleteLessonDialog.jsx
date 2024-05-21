import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useEditLesson } from '../../../../context/EditLessonContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteLesson, getCourseById } from '../../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';

function DeleteLessonDialog({ open, handleClose }) {
  const { lesson, setIsDirty } = useEditLesson();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.teaching.delete
  );
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleDelete = () => {
    dispatch(deleteLesson(lesson.id));
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDirty(false);
      navigate(`/teaching/courses/${courseId}/syllabus`);
      toast.success('Lesson deleted successfully', {
        position: 'bottom-center',
      });
      dispatch(getCourseById(courseId));
    } else if (isError) {
      toast.error(message, {
        position: 'bottom-center',
      });
    }
  }, [isSuccess, isError, message]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to delete this lesson?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Lesson deletion is irreversible. Are you sure you want to delete this lesson?
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

export default DeleteLessonDialog;
