import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';

const createCourseCopy = (course) => {
  const copy = {
    ...course,
    title: course.title + ' (Copy)', // append '(Copy)' to the title
    category: course.category.id, // ensure category is an id
    active: false, // set active to false

    // Construct chapters, lessons, lesson steps without the unnecesary properties
    // Copying is required to avoid mutating the original course object, as it is immutable/sealed by redux
    chapters: course.chapters.map(({ id, creation_date, ...chapterRest }) => ({
      ...chapterRest,
      lessons: chapterRest.lessons.map(({ id, chapter_id, ...lessonRest }) => ({
        ...lessonRest,
        lesson_steps: lessonRest.lesson_steps.map(
          ({ id, ...lessonStepRest }) => ({
            ...lessonStepRest,
          })
        ),
      })),
    })),
  };

  // Delete the 'id', 'creation_date', and 'release_date' from the course copy
  delete copy.id;
  delete copy.creation_date;
  delete copy.release_date;

  return copy;
};

function DuplicateCourseDialog({ open, handleClose, course }) {
  const dispatch = useDispatch();
  const toastId = useRef(null);

  const { isSuccess, isError, message } = useSelector(
    (state) => state.teaching.create
  );

  const handleDuplicate = () => {
    const courseCopy = createCourseCopy(course);

    dispatch(createCourse({ course: courseCopy, isImageUrl: true }));

    toastId.current = toast.loading('Creating course copy...', {
      position: 'bottom-center',
      autoClose: false,
      isLoading: true,
    });

    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.update(toastId.current, {
        render: 'Course copied successfully!',
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
        {'Are you sure you want to create a copy of this course?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button
          onClick={handleDuplicate}
          autoFocus
          variant='outlined'
          color='secondary'
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DuplicateCourseDialog;
