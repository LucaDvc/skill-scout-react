import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../../components/Copyright';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearGeneralErrorMessage,
  clearSpecificErrorMessage,
  register,
  reset,
} from '../../../features/users/usersSlice';
import Spinner from '../../../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
    firstName: '',
    lastName: '',
  });

  const { email, password1, password2, firstName, lastName } = formData;

  const { isError, isSuccess, isLoading, message, errors } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate('/notify-confirm-email', { state: { from: 'register' } });
    }
  }, [isSuccess, isError, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password1: password1,
      password2: password2,
      first_name: firstName,
      last_name: lastName,
    };

    if (userData.password1 !== userData.password2) {
      setIsFormInvalid(true);
      setFormErrorMessage('Passwords do not match');
      return;
    }

    dispatch(register(userData));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Form validation errors */}
              {isFormInvalid && (
                <Grid item xs={12}>
                  <Alert
                    severity='error'
                    onClose={() => setIsFormInvalid(false)}
                  >
                    {formErrorMessage}
                  </Alert>
                </Grid>
              )}
              {/* Backend response errors */}
              {message && (
                <Grid item xs={12}>
                  <Alert
                    severity='error'
                    onClose={() => dispatch(clearGeneralErrorMessage())}
                  >
                    {message}
                  </Alert>
                </Grid>
              )}
              {errors &&
                Object.keys(errors).map((key) =>
                  errors[key].map((errMessage, idx) => (
                    <Grid item xs={12}>
                      <Alert
                        severity='error'
                        onClose={() =>
                          dispatch(clearSpecificErrorMessage(key, idx))
                        }
                        key={key + idx}
                      >
                        {errMessage}
                      </Alert>
                    </Grid>
                  ))
                )}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  value={firstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  value={lastName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  value={email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password1'
                  label='Password'
                  type='password'
                  id='password1'
                  autoComplete='new-password'
                  value={password1}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password2'
                  label='Confirm Password'
                  type='password'
                  id='password2'
                  autoComplete='confirm-new-password'
                  value={password2}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Link to='/login' style={{ color: 'inherit' }}>
                  <Typography variant='body2'>
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Register;
