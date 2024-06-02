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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  clearGeneralErrorMessage,
  login,
  reset,
} from '../../../features/users/usersSlice';
import Spinner from '../../../components/Spinner';
import { Alert, Divider } from '@mui/material';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const { email, password, rememberMe } = formData;

  const { isError, isSuccess, isLoading, message } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';
  console.log('from', from);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate(from);
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
      password: password,
      rememberMe: rememberMe,
    };

    dispatch(login(userData));
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
            Sign in
          </Typography>
          <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
            {/* Backend response errors */}
            {message && (
              <Alert
                severity='error'
                onClose={() => dispatch(clearGeneralErrorMessage())}
                action={
                  message === 'Email not confirmed' ? (
                    <Button
                      color='inherit'
                      size='small'
                      onClick={() => {
                        navigate('/notify-confirm-email');
                        dispatch(reset());
                      }}
                    >
                      Resend Email
                    </Button>
                  ) : null
                }
              >
                {message}
              </Alert>
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={onChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  id='rememberMe'
                  name='rememberMe'
                  onChange={() =>
                    setFormData((prevState) => ({
                      ...prevState,
                      rememberMe: !rememberMe,
                    }))
                  }
                />
              }
              label='Remember me'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Divider sx={{ my: 2 }} />
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Link to='/forgot-password' style={{ color: 'inherit' }}>
                  <Typography variant='body2'>Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/notify-confirm-email' style={{ color: 'inherit' }}>
                  <Typography variant='body2'>Confirm your email</Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent='center' sx={{ my: 2 }}>
              <Grid item>
                <Link to='/register' style={{ color: 'inherit' }}>
                  <Typography variant='body2'>Don't have an account? Sign Up</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
