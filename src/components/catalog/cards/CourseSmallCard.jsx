import React from 'react';
import { Card, CardContent, Typography, Box, Rating, CardMedia } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link } from 'react-router-dom';

function CourseSmallCard({ course }) {
  return (
    <Link to={`/catalog/courses/${course.id}`} className='link-no-style'>
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
      >
        <CardContent
          sx={{
            paddingBottom: '16px',
            paddingRight: '90px',
            minHeight: 140,
          }}
        >
          <Link to={`/catalog/courses/${course.id}`} className='link-no-style'>
            <Typography
              gutterBottom
              variant='h6'
              component='div'
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              {course.title}
            </Typography>
          </Link>

          <Link to={`/users/${course.instructor.id}`} className='link-no-style'>
            <Typography
              variant='body2'
              component='span'
              color='text.secondary'
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              {course.instructor.first_name + ' ' + course.instructor.last_name}
            </Typography>
          </Link>

          <Box
            sx={{
              mt: 8,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1' color='text.secondary' component='span'>
                {course.average_rating % 1 === 0
                  ? course.average_rating
                  : course.average_rating.toFixed(1)}
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

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleAltIcon color='action' fontSize='small' />
              <Typography variant='body2' color='text.secondary' component='span'>
                {course.enrolled_learners}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon color='action' fontSize='small' sx={{ mr: 0.75 }} />
              <Typography variant='body2' color='text.secondary' component='span'>
                {course.total_hours} h
              </Typography>
            </Box>
          </Box>

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
    </Link>
  );
}

export default CourseSmallCard;
