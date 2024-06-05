import { Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import DeleteLessonStepDialog from '../../../prompt/DeleteLessonStepDialog';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import { downloadLessonStep, importStepFromFile } from './lessonStepUtils';
import { toast } from 'react-toastify';
import VisuallyHiddenInput from './VisuallyHiddenInput';

function LessonStepHeader({ children }) {
  const { selectedStep, setSelectedStep, setSteps } = useEditLesson();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const fileInputRef = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const exportStep = () => {
    downloadLessonStep(selectedStep);
    handleMenuClose();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const importedStep = await importStepFromFile(file, selectedStep.type);
        importedStep.id = selectedStep.id;
        importedStep.order = selectedStep.order;
        setSteps((steps) =>
          steps.map((step) => (step.id === selectedStep.id ? importedStep : step))
        );
        setSelectedStep(importedStep);
        toast.success('Step imported successfully');
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        event.target.value = null;
      }
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    handleMenuClose();
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant='h6' mr={1}>
          {children}
        </Typography>
        <IconButton
          aria-label='delete step'
          size='small'
          onClick={() => setDeleteDialogOpen(true)}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
        <IconButton aria-label='step options' size='small' onClick={handleMenuOpen}>
          <MoreHorizIcon fontSize='small' />
        </IconButton>
        <Menu
          id='step-options-menu'
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'step options',
          }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <MenuItem onClick={exportStep} disabled={selectedStep.type === 'video'}>
            <ListItemIcon>
              <DownloadIcon fontSize='small' />
            </ListItemIcon>
            Export step
          </MenuItem>
          <MenuItem onClick={handleImportClick} disabled={selectedStep.type === 'video'}>
            <ListItemIcon>
              <UploadIcon fontSize='small' />
            </ListItemIcon>
            Import step
          </MenuItem>
        </Menu>
      </Box>
      <VisuallyHiddenInput
        type='file'
        accept='.json'
        onChange={handleFileChange}
        ref={fileInputRef} // Attach the ref to the input
      />

      <DeleteLessonStepDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
}

export default LessonStepHeader;
