import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function LogoutDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Are you sure you want to log out?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleLogout} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;
