import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  clearGeneralErrorMessage,
  clearSpecificErrorMessage,
  reset,
  resetPassword,
} from '../../../features/users/usersSlice';
import Spinner from '../../../components/layout/Spinner';
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { isSuccess, isError, isLoading, message, errors } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setOpenSnackbar(true);
    }
  }, [isSuccess]);

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
    dispatch(reset());
    setIsFormInvalid(false);

    if (password1 !== password2) {
      setIsFormInvalid(true);
      setFormErrorMessage('Passwords do not match');
      return;
    }

    const token = searchParams.get('token');
    const uidb64 = searchParams.get('uidb64');
    dispatch(resetPassword({ token, uidb64, password: password1 }));
  };

  return (
    <Container component='main' maxWidth='sm'>
      {isLoading && <Spinner />}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant='h3' gutterBottom>
          Reset Password
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {isFormInvalid && (
            <Alert severity='error' onClose={() => setIsFormInvalid(false)}>
              {formErrorMessage}
            </Alert>
          )}

          {/* Backend response errors */}
          {isError && message && (
            <Alert severity='error' onClose={() => dispatch(clearGeneralErrorMessage())}>
              {message}
            </Alert>
          )}

          {errors &&
            Object.keys(errors).map((key) =>
              errors[key].map((errMessage, idx) => (
                <Alert
                  severity='error'
                  onClose={() => dispatch(clearSpecificErrorMessage(key, idx))}
                  key={key + idx}
                  sx={{ mt: 1 }}
                >
                  {errMessage}
                </Alert>
              ))
            )}

          <TextField
            margin='normal'
            required
            fullWidth
            id='password1'
            label='New Password'
            name='password1'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            autoFocus
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='password2'
            label='Confirm New Password'
            name='password2'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPassword;
