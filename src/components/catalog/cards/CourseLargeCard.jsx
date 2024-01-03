import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Stack,
  Link,
  Avatar,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';

function CourseLargeCard({ course }) {
  const navigate = useNavigate();

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
          cursor: 'pointer',
        },
      }}
      onClick={() => navigate('/catalog/courses/' + course.id)}
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
            <Box mt={1} ml={1}>
              <Link
                href={`catalog/courses/${course.id}`}
                underline='hover'
                sx={{
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                <Typography variant='h6' component='span'>
                  {course.title}
                </Typography>
              </Link>

              <Typography variant='body1'>{course.intro}</Typography>

              <Link
                href={`users/${course.instructor.id}`}
                underline='hover'
                sx={{
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
                mt={1}
              >
                <Typography
                  variant='body2'
                  color='text.secondary'
                  component='span'
                >
                  {course.instructor.first_name +
                    ' ' +
                    course.instructor.last_name}
                </Typography>
              </Link>

              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                marginTop={1}
              >
                <Box sx={{ display: 'flex', alignContent: 'center' }}>
                  <Rating
                    name='read-only'
                    value={course.average_rating}
                    precision={0.1}
                    readOnly
                    size='small'
                  />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    component='span'
                  >
                    {course.average_rating}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignContent: 'center' }}>
                  <PeopleAltIcon color='action' fontSize='small' />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    component='span'
                  >
                    {course.enrolled_learners}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignContent: 'center' }}>
                  <AccessTimeIcon
                    color='action'
                    fontSize='small'
                    sx={{ mr: 0.75 }}
                  />
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    component='span'
                  >
                    {course.total_hours} h
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box mt={1} sx={{ alignSelf: 'flex-start' }}>
            <Typography
              variant='h6'
              component='div'
              color={course.price == 0 && 'secondary.dark'}
            >
              {course.price == 0 ? 'Free' : `$${course.price}`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CourseLargeCard;
