import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Stack,
  CardMedia,
  Link,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';

function CourseSmallCard({ course }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        overflow: 'visible',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
          transform: 'scale(1.05)',
          cursor: 'pointer',
        },
      }}
      onClick={() => navigate(`/catalog/courses/${course.id}`)}
    >
      <CardContent
        sx={{
          paddingBottom: '16px',
          paddingRight: '90px',
          minHeight: 140,
        }}
      >
        <Link
          href={`catalog/courses/${course.id}`}
          underline='hover'
          sx={{
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <Typography gutterBottom variant='h6' component='div'>
            {course.title}
          </Typography>
        </Link>

        <Link
          href={`users/${course.instructor.id}`}
          underline='hover'
          sx={{
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            {course.instructor.first_name + ' ' + course.instructor.last_name}
          </Typography>
        </Link>

        <Stack direction='row' spacing={2} alignItems='center' marginTop={8}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body1' color='text.secondary' component='span'>
              {course.average_rating}
            </Typography>
            <Rating
              name='read-only'
              value={course.average_rating}
              precision={0.1}
              readOnly
              size='small'
            />

            <Typography variant='body2' color='text.secondary' component='span'>
              {` (${course.reviews_no})`}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignContent: 'center' }}>
            <PeopleAltIcon color='action' fontSize='small' />
            <Typography variant='body2' color='text.secondary' component='span'>
              {course.enrolled_learners}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignContent: 'center' }}>
            <AccessTimeIcon color='action' fontSize='small' sx={{ mr: 0.75 }} />
            <Typography variant='body2' color='text.secondary' component='span'>
              {course.total_hours} h
            </Typography>
          </Box>
        </Stack>

        <Typography
          variant='h5'
          component='div'
          marginTop={2}
          color={course.price == 0 && 'secondary.dark'}
        >
          {course.price == 0 ? 'Free' : `$${course.price}`}
        </Typography>
      </CardContent>
      {/* <CardActions
        disableSpacing
        sx={{ position: 'absolute', top: -8, right: -8, zIndex: 1 }}
      >
        <IconButton aria-label='add to favorites' onClick={handleFavoriteClick}>
          <FavoriteBorderIcon color={isFavorite ? 'primary' : 'action'} />
        </IconButton>
      </CardActions> */}
      <CardMedia
        component='img'
        image={course.image}
        alt='Course Thumbnail'
        sx={{
          width: '90px',
          height: '90px',
          position: 'absolute',
          top: 12,
          right: 12,
          borderRadius: 1,
        }}
      />
    </Card>
  );
}

export default CourseSmallCard;
