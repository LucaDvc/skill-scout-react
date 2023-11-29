import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { confirmEmail, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { Container, Link, Typography } from '@mui/material';

function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [pageMessage, setPageMessage] = useState(
    'Invalid or expired token. Please request another confirmation email.'
  );

  const { isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      dispatch(confirmEmail(token));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setPageMessage('Email confirmed successfully. You can now login.');
      dispatch(reset());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError && message) {
      setPageMessage(message);
      dispatch(reset());
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Typography variant='h3'>Email Confirmation</Typography>
      <Typography variant='h5'>{pageMessage}</Typography>
    </Container>
  );
}

export default ConfirmEmail;
