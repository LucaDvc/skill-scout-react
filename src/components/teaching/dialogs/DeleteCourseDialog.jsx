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
import { deleteCourse } from '../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteCourseDialog({ open, handleClose, courseId }) {
  const dispatch = useDispatch();
  const toastId = useRef(null);

  const { isSuccess, isError, message } = useSelector(
    (state) => state.teaching.delete
  );

  const handleDelete = () => {
    dispatch(deleteCourse(courseId));
    toastId.current = toast.loading('Deleting course...', {
      position: 'bottom-center',
      autoClose: false,
      isLoading: true,
    });
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastId.current, {
        render: 'Course deleted successfully!',
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to delete this course?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          The learners of this course will lose access to it, and all the
          related data will be lost too. This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete} variant='outlined' color='error'>
          Yes, delete permanently
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCourseDialog;
