import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCourseDialog from '../dialogs/DeleteCourseDialog';
import DuplicateCourseDialog from '../dialogs/DuplicateCourseDialog';

function TeachingCourseCard({ course }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setAnchorEl(null);
    setOpenDeleteDialog((prevState) => !prevState);
  };

  const [openDuplicateDialog, setOpenDuplicateDialog] = useState(false);

  const handleDuplicateClick = () => {
    setAnchorEl(null);
    setOpenDuplicateDialog((prevState) => !prevState);
  };

  return (
    <>
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
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Box sx={{ margin: 1 }}>
                <Avatar
                  src={course.image}
                  alt='Course Thumbnail'
                  variant='rounded'
                  sx={{ width: 112, height: 112 }}
                />
              </Box>
              <Box mt={1} ml={1} width='50%'>
                <Link
                  to={`/teaching/courses/${course.id}`}
                  className='link-no-style'
                >
                  <Typography
                    variant='h6'
                    component='span'
                    sx={{ '&:hover': { textDecoration: 'underline' } }}
                  >
                    {course.title}
                  </Typography>
                </Link>
                <Typography variant='body1' sx={{ fontStyle: 'italic' }}>
                  {course.release_date === null
                    ? 'Draft'
                    : course.active
                    ? 'Active'
                    : 'Inactive'}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    marginTop: 4,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    to={`/teaching/courses/${course.id}/information`}
                    className='link-no-style'
                  >
                    <Typography
                      variant='body1'
                      sx={{ '&:hover': { textDecoration: 'underline' } }}
                    >
                      Information
                    </Typography>
                  </Link>
                  <Link
                    to={`/teaching/courses/${course.id}/syllabus`}
                    className='link-no-style'
                  >
                    <Typography
                      variant='body1'
                      sx={{ '&:hover': { textDecoration: 'underline' } }}
                    >
                      Syllabus
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box mt={1} sx={{ alignSelf: 'flex-start' }}>
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
                  onClick={() => navigate(`courses/${course.id}`)}
                  disableRipple
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDuplicateClick} disableRipple>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  Duplicate
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} disableRipple>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <DeleteCourseDialog
        open={openDeleteDialog}
        handleClose={handleDeleteClick}
        courseId={course.id}
      />

      <DuplicateCourseDialog
        open={openDuplicateDialog}
        handleClose={handleDuplicateClick}
        course={course}
      />
    </>
  );
}

export default TeachingCourseCard;
