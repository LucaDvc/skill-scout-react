import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dropCourse } from '../../../features/learning/learningSlice';
import { refreshAuthUser } from '../../../features/users/usersSlice';

function DropCourseDialog({ open, handleClose, courseId }) {
  const dispatch = useDispatch();
  const toastId = useRef(null);

  const { isSuccess, isError, message } = useSelector((state) => state.learning.drop);

  const handleDelete = () => {
    dispatch(dropCourse(courseId));
    toastId.current = toast.loading('Dropping course...', {
      position: 'bottom-center',
      autoClose: false,
      isLoading: true,
    });
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastId.current, {
        render: 'Course dropped successfully',
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      dispatch(refreshAuthUser());
    }

    if (isError) {
      toast.update(toastId.current, {
        render: message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  }, [isSuccess, isError, message]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to drop this course?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          You will lose all of your progress and the access to this course without being
          refunded.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant='outlined' color='error'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DropCourseDialog;
