import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import ReactRouterPrompt from 'react-router-prompt';
import CloseIcon from '@mui/icons-material/Close';

function UnsavedChangesPrompt({ when }) {
  return (
    <ReactRouterPrompt when={when}>
      {({ isActive, onConfirm, onCancel }) => {
        return (
          <Dialog
            open={isActive}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='subtitle1'>Unsaved changes</Typography>
                <IconButton onClick={onCancel}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {'You have unsaved changes. Are you sure you want to leave?'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onCancel} variant='outlined' color='secondary' autoFocus>
                Cancel
              </Button>
              <Button onClick={onConfirm} variant='contained' color='primary'>
                Discard Changes
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    </ReactRouterPrompt>
  );
}

export default UnsavedChangesPrompt;
