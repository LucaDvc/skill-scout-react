import { Avatar, Box, Container, Divider, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { useGetProfile } from '../../../hooks/useGetProfile';
import Spinner from '../../../components/layout/Spinner';
import { useParams } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import CourseSmallCard from '../../../components/catalog/cards/CourseSmallCard';

function ProfileView() {
  const { userId } = useParams();
  const { user, isLoading } = useGetProfile(userId);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container maxWidth='lg' sx={{ my: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
          >
            <Avatar
              src={user.picture}
              sx={{ width: 150, height: 150 }}
              variant='rounded'
            />
            {user.city && (
              <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
                Based in {user.city}
              </Typography>
            )}
            {user.personal_website && (
              <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
                <Link
                  href={user.personal_website}
                  target='_blank'
                  rel='noreferrer'
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                  className='link-underline-hover'
                >
                  <LanguageIcon
                    fontSize='small'
                    sx={{ mr: 1, color: 'text.secondary' }}
                  />
                  <Typography
                    variant='body2'
                    sx={{
                      display: 'inline',
                      textDecoration: 'none',
                      color: 'text.secondary',
                    }}
                  >
                    Personal Website
                  </Typography>
                </Link>
              </Typography>
            )}
            {user.linked_in && (
              <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
                <Link
                  href={user.linked_in}
                  target='_blank'
                  rel='noreferrer'
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                  className='link-underline-hover'
                >
                  <LinkedInIcon
                    fontSize='small'
                    sx={{ mr: 1, color: 'text.secondary' }}
                  />
                  <Typography
                    variant='body2'
                    sx={{
                      display: 'inline',
                      textDecoration: 'none',
                      color: 'text.secondary',
                    }}
                  >
                    Linked In
                  </Typography>
                </Link>
              </Typography>
            )}
            {user.youtube && (
              <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
                <Link
                  href={user.youtube}
                  target='_blank'
                  rel='noreferrer'
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                  className='link-underline-hover'
                >
                  <YouTubeIcon fontSize='small' sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography
                    variant='body2'
                    sx={{
                      display: 'inline',
                      textDecoration: 'none',
                      color: 'text.secondary',
                    }}
                  >
                    YouTube
                  </Typography>
                </Link>
              </Typography>
            )}
            {user.facebook && (
              <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
                <Link
                  href={user.facebook}
                  target='_blank'
                  rel='noreferrer'
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                  className='link-underline-hover'
                >
                  <FacebookIcon
                    fontSize='small'
                    sx={{ mr: 1, color: 'text.secondary' }}
                  />
                  <Typography
                    variant='body2'
                    sx={{
                      display: 'inline',
                      textDecoration: 'none',
                      color: 'text.secondary',
                    }}
                  >
                    Facebook
                  </Typography>
                </Link>
              </Typography>
            )}

            {user.short_bio && (
              <>
                <Divider sx={{ borderColor: 'lightgray', mt: 2 }} />
                <Typography variant='body2' sx={{ color: 'text.secondary', mt: 2 }}>
                  {user.short_bio}
                </Typography>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography variant='h3'>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            {user.about}
          </Typography>

          <Grid container spacing={5} sx={{ mt: 1 }}>
            {user.courses.map((course) => (
              <Grid item xs={12} md={5} key={course.id}>
                <CourseSmallCard course={course} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileView;
