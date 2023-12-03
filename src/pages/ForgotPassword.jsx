import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { reset, sendForgotPasswordEmail } from '../features/users/usersSlice';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError || isSuccess) {
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

  const sendEmail = (e) => {
    e.preventDefault();
    setOpenSnackbar(false);
    dispatch(reset());
    dispatch(sendForgotPasswordEmail(email));
  };

  return (
    <Container component='main' maxWidth='md'>
      {isLoading && <Spinner />}
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
          {message}
        </Alert>
      </Snackbar>
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
          Send password reset email
        </Typography>
        <Box component='form' onSubmit={sendEmail} sx={{ mt: 1 }}>
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
            type='email'
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
    </Container>
  );
}

export default ForgotPassword;
