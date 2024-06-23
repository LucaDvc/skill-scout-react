import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  confirmEmail,
  resendConfirmationEmail,
  reset,
} from '../../../features/users/usersSlice';
import Spinner from '../../../components/layout/Spinner';
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';

function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [confirmationState, setConfirmationState] = useState('pending'); // 'pending', 'success', 'error'
  const [resendEmailSuccess, setResendEmailSuccess] = useState(false);

  const { isSuccess, isError, isLoading, message } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      dispatch(confirmEmail(token));
    } else {
      setConfirmationState('error');
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      if (confirmationState === 'pending') {
        // This means the email confirmation was successful
        setConfirmationState('success');
        setResendEmailSuccess(false);
      } else if (confirmationState === 'error') {
        // This means the resend email was successful
        setResendEmailSuccess(true);
      }
    } else if (isError) {
      setConfirmationState('error');
      setResendEmailSuccess(false); // Reset this to false on error
    }
  }, [isSuccess, isError, confirmationState]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const resendEmail = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(reset());
      dispatch(resendConfirmationEmail(email))
        .unwrap()
        .then(() => {
          // Handle success for resend email action
          setResendEmailSuccess(true);
          setConfirmationState('error');
        })
        .catch(() => {
          setResendEmailSuccess(false);
        });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container component='main' maxWidth='md'>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {confirmationState === 'error' && (
          <>
            <Typography variant='h3' gutterBottom>
              Email Confirmation
            </Typography>
            <Box component='form' onSubmit={resendEmail} sx={{ mt: 1 }}>
              <Alert
                severity={
                  resendEmailSuccess || confirmationState === 'success'
                    ? 'success'
                    : 'error'
                }
                sx={{ width: '100%', mb: 2 }}
              >
                {resendEmailSuccess
                  ? 'A new confirmation email has been sent.'
                  : message ||
                    'Invalid or expired token. Please enter your email to resend the confirmation email.'}
              </Alert>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Resend Confirmation Email
              </Button>
            </Box>
          </>
        )}
        {confirmationState === 'success' && (
          <>
            <Typography variant='h3' gutterBottom>
              Email Confirmation
            </Typography>
            <Typography variant='h5' gutterBottom>
              Your email has been confirmed successfully. You can now{' '}
              <Link href='/login'>
                <Typography variant='h5' component='span'>
                  sign in
                </Typography>
              </Link>
              .
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}

export default ConfirmEmail;
