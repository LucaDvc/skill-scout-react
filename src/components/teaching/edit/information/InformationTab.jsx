import {
  Backdrop,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import UploadBox from './UploadBox';
import { useDispatch, useSelector } from 'react-redux';
import CourseTitleField from './CourseTitleField';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import ChooseCategoryDialog from './ChooseCategoryDialog';
import categoryUtils from '../../../../utils/categoryUtils';
import { Editor } from '@tinymce/tinymce-react';
import informationTabConstants from './constants';
import { nanoid } from 'nanoid';
import { reset, updateCourse } from '../../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';
import UnsavedChangesPrompt from '../prompt/UnsavedChangesPrompt';

function InformationTab() {
  const STD_MARGIN_TOP = 4;

  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toast
  const toastId = useRef(null);

  // Redux
  const { course, isSuccess, isError, message } = useSelector(
    (state) => state.teaching.edit
  );
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // Image
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (newImageFile) => {
    setImageFile(newImageFile);
    setIsDirty(true);
  };

  // Categories
  const [openCategoriesDialog, setOpenCategoriesDialog] = useState(false);

  const handleCategoriesClick = () => {
    setOpenCategoriesDialog((prevState) => !prevState);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    course?.category ? course.category.id : ''
  );

  useEffect(() => {
    setSelectedCategoryId(course?.category?.id);
  }, [course]);

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    intro: '',
    level: '',
    totalHours: '',
    tags: [],
    price: '',
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        intro: course.intro ? course.intro : '',
        level: course.level ? course.level : '',
        totalHours: course.total_hours ? course.total_hours : 0,
        tags: course.tags,
        price: course.price ? course.price : 0,
      });
    }
  }, [course]);

  const { title, intro, level, totalHours, tags, price } = formData;

  const descriptionEditorRef = useRef(null);
  const requirementsEditorRef = useRef(null);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setIsDirty(true);
  };

  const handleTotalHoursChange = (event) => {
    const value = event.target.value;
    if ((/^(?!0)\d+$/.test(value) && parseInt(value, 10) <= 200) || value === '') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalHours: value,
      }));
      setIsDirty(true);
    }
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    // Allow decimal between 0 and 1000 inclusive, including just "0"
    // If the first number is 0, only allow "0" or "0.xx"
    if (
      ((/^0(\.\d{0,2})?$/.test(value) || /^(?!0)\d{0,4}?$/.test(value)) &&
        parseInt(value) <= 1000) ||
      value === ''
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        price: value,
      }));
      setIsDirty(true);
    }
  };

  const handleTagAdd = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          tags: [...prevFormData.tags, { id: nanoid(), name: value }],
        }));
        event.target.value = '';
      }
      setIsDirty(true);
    }
  };

  const handleTagDelete = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((tag) => tag.id !== id),
    }));
    setIsDirty(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (descriptionEditorRef.current.getContent().length < 100) {
      toast.error('Description must be at least 100 characters long.');
      return;
    }

    setLoading(true);
    toastId.current = toast.loading('Saving changes...', {
      autoClose: false,
      isLoading: true,
    });

    const form = new FormData();

    // Append text fields to formData
    form.append('title', formData.title);
    form.append('intro', formData.intro);
    form.append('level', formData.level);
    form.append('total_hours', formData.totalHours);
    if (selectedCategoryId) form.append('category', selectedCategoryId);
    form.append('description', descriptionEditorRef.current.getContent());
    form.append('requirements', requirementsEditorRef.current.getContent());
    const tagsJsonString = JSON.stringify(formData.tags);
    form.append('tags', tagsJsonString);
    form.append('price', formData.price);
    // Append the image file if it has been selected
    if (imageFile) {
      form.append('image', imageFile);
      setIsDirty(true);
    }

    dispatch(updateCourse({ id: course.id, updatedCourse: form }));
  };

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      toast.update(toastId.current, {
        render: 'Course updated successfully!',
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        onClose: () => {
          dispatch(reset());
        },
      });
      setIsDirty(false);
    }

    if (isError) {
      setLoading(false);
      toast.update(toastId.current, {
        render: message,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        onClose: () => {
          dispatch(reset());
        },
      });
    }
  }, [isSuccess, isError, message]);

  return (
    course && (
      <Box my={2} component='form' onSubmit={handleSubmit}>
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} />
        <Typography variant='h3' mb={STD_MARGIN_TOP}>
          Information
        </Typography>

        <UnsavedChangesPrompt when={isDirty} />

        {/* Image */}
        <UploadBox imageUrl={course.image} onImageChange={handleImageChange} />

        {/* Title */}
        <CourseTitleField
          title={title}
          onChange={handleFormChange}
          name='title'
          marginTop={STD_MARGIN_TOP}
        />

        {/* Category */}
        <Typography variant='h5' mt={STD_MARGIN_TOP}>
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
        <ChooseCategoryDialog
          open={openCategoriesDialog}
          handleClose={handleCategoriesClick}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          setIsDirty={setIsDirty}
        />
        {selectedCategoryId && (
          <Typography variant='body1' mt={2}>
            Selected category:
            <Typography variant='subtitle2' component='span' sx={{ fontStyle: 'italic' }}>
              {' ' +
                (selectedCategoryId === course.category?.id
                  ? course.category.name
                  : categoryUtils.findCategoryById(categories, selectedCategoryId)?.name)}
            </Typography>
          </Typography>
        )}

        {/* Intro */}
        <TextField
          label='Summary'
          value={intro}
          onChange={handleFormChange}
          name='intro'
          multiline
          rows={3}
          variant='outlined'
          fullWidth
          sx={{ marginTop: STD_MARGIN_TOP }}
          InputProps={{
            inputProps: {
              maxLength: 299,
            },
          }}
          helperText='Max. 300 characters'
          placeholder='Displayed at the search and promo pages right below the title of the course.'
        />

        <Grid
          container
          spacing={2}
          sx={{
            marginTop: STD_MARGIN_TOP,
          }}
        >
          {/* Price */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={price}
              onChange={handlePriceChange}
              name='price'
              label='Price'
              variant='outlined'
              InputProps={{
                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              }}
              sx={{ width: 225 }}
              helperText='Max. $1000, $0 for free courses'
            />
          </Grid>

          {/* Completion time */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={totalHours}
              onChange={handleTotalHoursChange}
              name='totalHours'
              label='Expected Time to Complete'
              variant='outlined'
              InputProps={{
                endAdornment: <InputAdornment position='end'>hours</InputAdornment>,
              }}
              sx={{ width: 225 }}
              helperText='Max. 200 hours'
            />
          </Grid>

          {/* Level */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControl sx={{ minWidth: 225 }}>
              <InputLabel id='level'>Level</InputLabel>
              <Select
                name='level'
                labelId='level'
                id='level-select'
                label='Level'
                value={level}
                onChange={handleFormChange}
              >
                <MenuItem value='1'>Beginner</MenuItem>
                <MenuItem value='2'>Intermediate</MenuItem>
                <MenuItem value='3'>Advanced</MenuItem>
              </Select>
              <FormHelperText>&nbsp;</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        {/* Description */}
        <Box sx={{ marginTop: STD_MARGIN_TOP }}>
          <Typography variant='h5' mb={2} ml={1}>
            About the course
          </Typography>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            onInit={(evt, editor) => (descriptionEditorRef.current = editor)}
            initialValue={
              course.description
                ? course.description
                : informationTabConstants.COURSE_DESCRIPTION_PLACEHOLDER
            }
            init={{
              height: 500,
              menubar: false,
              plugins: informationTabConstants.EDITOR_PLUGINS,
              toolbar: informationTabConstants.EDITOR_TOOLBAR,
              content_style: informationTabConstants.EDITOR_CONTENT_STYLE,
            }}
            onChange={() => setIsDirty(true)}
          />
        </Box>

        {/* Requirements */}
        <Box sx={{ marginTop: STD_MARGIN_TOP }}>
          <Typography variant='h5' mb={2} ml={1}>
            Initial requirements
          </Typography>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            onInit={(evt, editor) => (requirementsEditorRef.current = editor)}
            initialValue={
              course.requirements
                ? course.requirements
                : informationTabConstants.COURSE_REQUIREMENTS_PLACEHOLDER
            }
            init={{
              height: 300,
              menubar: false,
              plugins: informationTabConstants.EDITOR_PLUGINS,
              toolbar: informationTabConstants.EDITOR_TOOLBAR,
              content_style: informationTabConstants.EDITOR_CONTENT_STYLE,
            }}
            onChange={() => setIsDirty(true)}
          />
        </Box>

        {/* Tags */}
        <Box mt={STD_MARGIN_TOP}>
          <Typography variant='h5' mb={2} ml={1}>
            Tags
          </Typography>
          <TextField
            label=''
            variant='outlined'
            fullWidth
            placeholder='Enter a tag name and press Enter'
            helperText='Tags are used to help learners find your course. Press Enter to add a tag.'
            onKeyDown={handleTagAdd}
          />

          <Box mt={2} display='flex' flexWrap='wrap'>
            {tags.map((tag) => (
              <Box key={tag.id} mr={1} mb={1}>
                <Chip
                  label={tag.name}
                  variant='outlined'
                  onDelete={() => handleTagDelete(tag.id)}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Submit */}
        <Box
          mt={STD_MARGIN_TOP * 2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button variant='contained' color='primary' type='submit' sx={{ width: '35%' }}>
            <Typography variant='h5'>Save</Typography>
          </Button>
        </Box>
      </Box>
    )
  );
}

export default InformationTab;
