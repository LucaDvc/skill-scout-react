import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Avatar,
  InputAdornment,
  Alert,
  Snackbar,
  Container,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch, useSelector } from 'react-redux';
import { reset, updateUserProfile } from '../../../features/users/usersSlice';
import Spinner from '../../../components/layout/Spinner';
import CityField from '../../../components/users/CityField';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    city: '',
    short_bio: '',
    about: '',
    linked_in: '',
    facebook: '',
    youtube: '',
    personal_website: '',
    is_private: false,
  });
  const [selectedPicture, setSelectedPicture] = useState(null);

  const { user, isError, message, isSuccess, isLoading } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setProfile({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      city: user.city || '',
      short_bio: user.short_bio || '',
      about: user.about || '',
      linked_in: user.linked_in || '',
      facebook: user.facebook || '',
      youtube: user.youtube || '',
      personal_website: user.personal_website || '',
      is_private: user.is_private || false,
      picture: user.picture,
    });
  }, [user]);

  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedPicture(file);
      setProfile({ ...profile, picture: URL.createObjectURL(file) });
    }
  };

  // Snackbar logic & state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if ((isError && message) || isSuccess) {
      setOpenSnackbar(true);
    }
  }, [isError, message, isSuccess]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (openSnackbar) {
      setOpenSnackbar(false);
      setTimeout(() => {
        dispatch(reset());
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all profile fields to formData
    Object.keys(profile).forEach((key) => {
      if (key === 'picture' && selectedPicture) {
        formData.append('picture', selectedPicture);
      } else {
        formData.append(key, profile[key]);
      }
    });
    // Dispatch action to make API call
    dispatch(updateUserProfile(formData));
  };

  return (
    <Container maxWidth='sm' sx={{ my: 2 }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isError ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {message ? message : 'Changes saved'}
        </Alert>
      </Snackbar>

      {isLoading && <Spinner />}

      <Typography variant='h4' gutterBottom textAlign='center'>
        My Profile
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 'md',
        }}
        component='form'
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <Avatar src={profile.picture} sx={{ width: 112, height: 112 }} />
        <Button
          variant='outlined'
          component='label'
          sx={{ margin: 1, width: 'fit-content' }}
        >
          Upload Picture
          <input
            type='file'
            hidden
            accept='image/*'
            onChange={handlePictureChange}
            name='picture'
          />
        </Button>

        <TextField
          label='First name'
          name='first_name'
          value={profile.first_name}
          onChange={handleChange}
          required
          sx={{
            margin: 1,
            width: '100%',
          }}
        />

        <TextField
          label='Last name'
          name='last_name'
          value={profile.last_name}
          onChange={handleChange}
          required
          sx={{
            margin: 1,
            width: '100%',
          }}
        />

        <CityField
          city={profile.city}
          setCity={(value) => setProfile({ ...profile, city: value })}
        />

        <TextField
          label='Short bio'
          name='short_bio'
          value={profile.short_bio}
          onChange={handleChange}
          inputProps={{ maxLength: 255 }}
          multiline
          rows={2}
          helperText='Max. 255 characters'
          sx={{
            margin: 1,
            width: '100%',
          }}
        />
        <TextField
          label='About'
          name='about'
          value={profile.about}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{
            margin: 1,
            width: '100%',
          }}
        />

        <TextField
          label='LinkedIn'
          name='linked_in'
          value={profile.linked_in}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LinkedInIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: 1,
            width: '100%',
          }}
        />
        <TextField
          label='Facebook'
          name='facebook'
          value={profile.facebook}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <FacebookIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: 1,
            width: '100%',
          }}
        />
        <TextField
          label='YouTube'
          name='youtube'
          value={profile.youtube}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <YouTubeIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: 1,
            width: '100%',
          }}
        />
        <TextField
          label='Personal Website'
          name='personal_website'
          value={profile.personal_website}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LanguageIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: 1,
            width: '100%',
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={profile.is_private || false}
              onChange={() =>
                setProfile((prevState) => ({
                  ...prevState,
                  is_private: !prevState.is_private,
                }))
              }
              name='is_private'
            />
          }
          label='Make profile private'
        />

        <Button
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
          sx={{ mt: 1, mb: 4 }}
        >
          Save changes
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileEdit;
