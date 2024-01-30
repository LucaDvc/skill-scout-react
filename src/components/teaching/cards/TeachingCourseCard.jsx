import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

function TeachingCourseCard({ course }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
              <Typography variant='h6' component='span'>
                {course.title}
              </Typography>

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
                  href={`teaching/courses/${course.id}/info`}
                  underline='hover'
                >
                  <Typography variant='body1'>Information</Typography>
                </Link>
                <Link
                  href={`teaching/courses/${course.id}/syllabus`}
                  underline='hover'
                >
                  <Typography variant='body1'>Syllabus</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box mt={1} sx={{ alignSelf: 'flex-start' }}>
            <IconButton
              aria-label='more'
              id='course-actions-button'
              aria-controls={open ? 'course-actions-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
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
              open={open}
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
              <MenuItem onClick={handleClose} disableRipple>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                Duplicate
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
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
  );
}

export default TeachingCourseCard;
