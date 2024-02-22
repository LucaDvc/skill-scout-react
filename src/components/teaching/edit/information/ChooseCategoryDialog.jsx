import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { getCategories } from '../../../../features/category/categorySlice';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  RadioGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import RecursiveCategories from './RecursiveCategories';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function ChooseCategoryDialog({
  open,
  handleClose,
  selectedCategoryId,
  setSelectedCategoryId,
  setIsDirty,
}) {
  const handleRadioChange = (event) => {
    setSelectedCategoryId(Number(event.target.value));
    setIsDirty(true);
  };

  const dispatch = useDispatch();
  const { categories, isLoading, isError } = useSelector(
    (state) => state.category
  );

  //Fetch categories
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (isError) {
      toast.error('Failed to fetch categories. Please try again later.');
    }
  }, [dispatch, isError]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby='category-dialog-title'
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id='category-dialog-title'>
        Choose a category
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography gutterBottom variant='body2'>
          The more precise categories perform better
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress color='inherit' size={12} />
          </Box>
        ) : (
          <Accordion disableGutters expanded={true}>
            <AccordionSummary expandIcon={null}>
              <Typography variant='subtitle1'>Categories</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <RadioGroup
                value={selectedCategoryId}
                onChange={handleRadioChange}
              >
                {categories.map((category) => (
                  <RecursiveCategories key={category.id} category={category} />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          autoFocus
          onClick={() => {
            handleClose();
          }}
          variant='outlined'
          color='secondary'
        >
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

export default ChooseCategoryDialog;
