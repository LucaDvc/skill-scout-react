import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import {
  addCourseToFavourites,
  removeCourseFromFavourites,
} from '../../../features/learning/learningSlice';
import { useDispatch } from 'react-redux';
import DropCourseDialog from '../dialogs/DropCourseDialog';

function LearningCourseCard({ course, action }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [dropDialogOpen, setDropDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };

  const handleAddCourseToFavourites = (event) => {
    event.stopPropagation();
    dispatch(addCourseToFavourites(course.id));
    handleClose();
  };

  const handleRemoveCourseFromFavourites = (event) => {
    event.stopPropagation();
    dispatch(removeCourseFromFavourites(course.id));
    handleClose();
  };

  const handleDialogClose = () => {
    setDropDialogOpen(false);
  };

  const handleDropCourse = (event) => {
    event.stopPropagation();
    setDropDialogOpen(true);
    handleClose();
  };

  const handleLearnClick = (event) => {
    // navigate to last stopped course step
    event.stopPropagation();
    let lastStoppedLessonId = course.learner_progress.last_stopped_lesson
      ? course.learner_progress.last_stopped_lesson
      : course.chapters[0].lessons[0].id;
    navigate(`/learning/course/${course.id}/lessons/${lastStoppedLessonId}/step/1`);
  };

  return (
    <>
      <DropCourseDialog
        open={dropDialogOpen}
        handleClose={handleDialogClose}
        courseId={course.id}
      />
      <Card
        sx={{
          maxWidth: '100%',
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative',
          overflow: 'hidden',
          transition: '0.3s',
          '&:hover': {
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
            transform: 'scale(1.02)',
            cursor: 'pointer',
          },
        }}
        onClick={() => navigate(`/learning/courses/${course.id}/syllabus`)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Box sx={{ margin: 1 }}>
                <Avatar
                  src={course.image}
                  alt='Course Thumbnail'
                  variant='rounded'
                  sx={{ width: 75, height: 75 }}
                />
              </Box>
              <Box mt={1} ml={1}>
                <Link
                  to={`/learning/courses/${course.id}/syllabus`}
                  className='link-no-style'
                  onClick={(event) => event.stopPropagation()}
                >
                  <Typography
                    variant='h6'
                    component='span'
                    sx={{
                      '&:hover': { textDecoration: 'underline' },
                      maxWidth: '50%',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {course.title}
                  </Typography>
                </Link>

                <Box>
                  <Link
                    to={`/users/${course.instructor.id}`}
                    className='link-no-style'
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Typography
                      variant='body2'
                      component='span'
                      sx={{
                        '&:hover': { textDecoration: 'underline' },
                        color: 'text.secondary',
                      }}
                    >
                      {`${course.instructor.first_name} ${course.instructor.last_name}`}
                    </Typography>
                  </Link>
                </Box>

                <Box display='flex' mt={1}>
                  {course.learner_progress.completion_ratio === 100.0 ? (
                    <CheckCircleOutlinedIcon
                      fontSize='small'
                      sx={{ color: 'success.main' }}
                    />
                  ) : (
                    <CircleOutlinedIcon fontSize='small' sx={{ color: 'success.main' }} />
                  )}
                  <Typography variant='body2' component='span'>
                    {`${course.learner_progress.completed_lessons.length}/${course.lessons_count}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              mt={1}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <IconButton
                aria-label='more'
                id='course-actions-button'
                aria-controls={menuOpen ? 'course-actions-menu' : undefined}
                aria-expanded={menuOpen ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='course-actions-menu'
                MenuListProps={{
                  'aria-labelledby': 'course-actions-button',
                }}
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={
                    action === 'add'
                      ? handleAddCourseToFavourites
                      : handleRemoveCourseFromFavourites
                  }
                  disableRipple
                >
                  {action === 'add' ? 'Add to Favourites' : 'Remove from Favourites'}
                </MenuItem>
                <MenuItem onClick={handleDropCourse} disableRipple>
                  Drop
                </MenuItem>
              </Menu>

              <Button variant='outlined' onClick={handleLearnClick}>
                Learn
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default LearningCourseCard;
