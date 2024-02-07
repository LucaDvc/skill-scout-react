import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import UploadBox from './UploadBox';
import { useSelector } from 'react-redux';
import CourseTitleField from './CourseTitleField';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ChooseCategoryDialog from './ChooseCategoryDialog';
import categoryUtils from '../../../../utils/categoryUtils';

function InformationTab() {
  const { course } = useSelector((state) => state.teaching.edit);
  const { categories } = useSelector((state) => state.category);

  const [openCategoriesDialog, setOpenCategoriesDialog] = useState(false);

  const handleCategoriesClick = () => {
    setOpenCategoriesDialog((prevState) => !prevState);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    course?.category.id
  );

  useEffect(() => {
    setSelectedCategoryId(course?.category.id);
  }, [course]);

  return (
    course && (
      <Box mt={2} component='form'>
        <Typography variant='h3' mb={4}>
          Information
        </Typography>
        <UploadBox imageUrl={course.image} />

        <CourseTitleField title={course.title} />

        <Typography variant='h5' mt={4}>
          Categories
        </Typography>
        <Button
          startIcon={<AddIcon fontSize='large' />}
          sx={{ padding: 1, marginTop: 2 }}
          variant='outlined'
          color='secondary'
          onClick={handleCategoriesClick}
        >
          <Typography variant='subtitle1'>Choose a category</Typography>
        </Button>
        {selectedCategoryId && (
          <Typography variant='body1' mt={2}>
            Selected category:
            <Typography
              variant='subtitle2'
              component='span'
              sx={{ fontStyle: 'italic' }}
            >
              {' ' +
                (selectedCategoryId === course.category.id
                  ? course.category.name
                  : categoryUtils.findCategoryById(
                      categories,
                      selectedCategoryId
                    )?.name)}
            </Typography>
          </Typography>
        )}

        <ChooseCategoryDialog
          open={openCategoriesDialog}
          handleClose={handleCategoriesClick}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </Box>
    )
  );
}

export default InformationTab;
