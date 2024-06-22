import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCourseChecklist } from '../../../../hooks/useCourseChecklist';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ChecklistItem from './ChecklistItem';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import {
  publishCourse,
  reset,
  updateCourse,
} from '../../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';

function CoursePublicationTab() {
  const navigate = useNavigate();

  const { course, isSuccess, isError, message } = useSelector(
    (state) => state.teaching.edit
  );
  const dispatch = useDispatch();

  const {
    atLeastTwoModules,
    atLeastTenLessons,
    logoUploaded,
    summaryMoreThan100,
    categorySelected,
    pointsCheckedNumber,
    courseReady,
  } = useCourseChecklist();

  const [loading, setLoading] = useState(false);
  const toastId = useRef(null);

  const courseStatus =
    course?.active && course?.release_date
      ? 'Published'
      : course?.release_date
      ? 'Unpublished'
      : 'Draft';

  const handleCourseStatusChange = () => {
    if (courseStatus === 'Published') {
      // unpublish course
      dispatch(updateCourse({ id: course.id, updatedCourse: { active: false } }));
    } else {
      // publish course
      dispatch(publishCourse(course.id));
    }
    setLoading(true);
    toastId.current = toast.loading('Saving changes...', {
      autoClose: false,
      isLoading: true,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.update(toastId.current, {
        render: 'Course updated successfully!',
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        onClose: () => {
          dispatch(reset());
        },
      });
    }

    if (isError) {
      setLoading(false);
      toast.update(toastId.current, {
        render: message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        onClose: () => {
          dispatch(reset());
        },
      });
    }
  }, [isSuccess, isError]);

  return (
    <Box py={2} justifyContent='flex-start' maxWidth='sm'>
      <Backdrop open={loading} sx={{ zIndex: 1000 }} />
      <Typography variant='h3' gutterBottom>
        Course publishing settings
      </Typography>

      <Card
        sx={{
          marginY: 2,
          borderRadius: 0,
          boxShadow: 0.5,
          borderWidth: 0.1,
          borderColor: 'grey.300',
          borderStyle: 'solid',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display='flex' gap={1} alignItems='center'>
            <Avatar
              sx={{
                bgcolor: courseReady ? 'success.main' : 'error.main',
                width: 30,
                height: 30,
              }}
            >
              {courseReady ? (
                <CheckCircleOutlineOutlinedIcon />
              ) : (
                <ErrorOutlineOutlinedIcon />
              )}
            </Avatar>
            <Typography variant='h5' sx={{ flexGrow: 1 }}>
              Course is {pointsCheckedNumber}/9 ready
            </Typography>
          </Box>

          <Box>
            <ChecklistItem title='At least 2 modules' isCompleted={atLeastTwoModules} />
            <ChecklistItem title='At least 10 lessons' isCompleted={atLeastTenLessons} />
            <ChecklistItem
              title='Summary more than 100 symbols'
              isCompleted={summaryMoreThan100}
            />
            <ChecklistItem title='Category selected' isCompleted={categorySelected} />
            <ChecklistItem title='Logo uploaded' isCompleted={logoUploaded} />
          </Box>

          <Button
            sx={{ padding: 1, paddingX: 2, mt: 1 }}
            variant='contained'
            color='secondary'
            onClick={() => navigate(`../checklist`)}
          >
            Open Checklist
          </Button>
        </CardContent>
      </Card>

      <Card
        sx={{
          marginY: 4,
          borderRadius: 0,
          boxShadow: 0.5,
          borderWidth: 0.1,
          borderColor: 'grey.300',
          borderStyle: 'solid',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display='flex' gap={1} alignItems='center'>
            <Avatar sx={{ width: 25, height: 25, borderRadius: 1, padding: 1.75 }}>
              {courseStatus === 'Published' ? (
                <CheckCircleOutlinedIcon />
              ) : courseStatus === 'Unpublished' ? (
                <VisibilityOffIcon />
              ) : (
                <UnpublishedOutlinedIcon />
              )}
            </Avatar>
            <Typography variant='subtitle1' sx={{ flexGrow: 1 }}>
              {courseStatus}
            </Typography>
          </Box>
          <Typography variant='body2' sx={{ my: 2 }}>
            {!course?.active
              ? 'I legally use all materials and respect copyright by publishing the course'
              : 'Unpublishing the course will make it invisible to students and will not be available for purchase. You can publish it again later.'}
          </Typography>
          <Button
            startIcon={
              courseStatus === 'Published' ? (
                <VisibilityOffIcon />
              ) : (
                <RocketLaunchOutlinedIcon />
              )
            }
            sx={{ padding: 1, paddingX: 2 }}
            variant='contained'
            color='secondary'
            onClick={handleCourseStatusChange}
          >
            {courseStatus === 'Published' ? 'Unpublish' : 'Publish'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CoursePublicationTab;
