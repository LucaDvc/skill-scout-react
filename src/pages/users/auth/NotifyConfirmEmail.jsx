import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/layout/Spinner';
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { resendConfirmationEmail, reset } from '../../../features/users/usersSlice';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import { useLocation } from 'react-router-dom';

function NotifyConfirmEmail() {
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState();
  const [showForm, setShowForm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isUserCheckComplete, setIsUserCheckComplete] = useState(false);

  const location = useLocation();
  const fromPage = location.state?.from;

  const { user, isSuccess, isError, isLoading, accessToken, message } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    accessToken ? setConfirmed(true) : setConfirmed(false);

    if (user) {
      setEmail(user.email);
      setShowForm(false);
      setIsUserCheckComplete(true);
      if (fromPage !== 'register') {
        dispatch(resendConfirmationEmail(user.email));
      }
    } else {
      setShowForm(true);
      setIsUserCheckComplete(true);
    }
  }, [user, dispatch, accessToken, fromPage]);

  useEffect(() => {
    if ((isError && message) || isSuccess) {
      setOpenSnackbar(true);
    }
  }, [isError, message, isSuccess]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

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

  const resendEmail = (e) => {
    e.preventDefault();
    dispatch(resendConfirmationEmail(email));
  };

  if (confirmed) {
    return (
      <Container component='main' maxWidth='md'>
        <Box sx={{ mt: 4 }}>
          <Typography variant='h4' gutterBottom>
            This email has already been confirmed. You can proceed to the login page.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (isLoading || !isUserCheckComplete) {
    return <Spinner />;
  }

  return (
    <Container component='main' maxWidth='md'>
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
          {message ? message : 'Email sent'}
        </Alert>
      </Snackbar>
      {showForm ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 16,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ForwardToInboxOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' gutterBottom>
            Send confirmation email
          </Typography>
          <Box component='form' onSubmit={resendEmail} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Send Mail
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant='h4' gutterBottom>
            An account confirmation email has been sent.
          </Typography>
          <Typography variant='h6'>
            Didn't receive an email?{' '}
            <Link variant='h6' onClick={resendEmail} sx={{ cursor: 'pointer' }}>
              Click here
            </Link>{' '}
            to resend it.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default NotifyConfirmEmail;
