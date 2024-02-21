import {
  Box,
  Button,
  Chip,
  FormControl,
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
import {
  reset,
  updateCourse,
} from '../../../../features/teaching/teachingSlice';
import { toast } from 'react-toastify';

function InformationTab() {
  const STD_MARGIN_TOP = 4;

  // Toast
  const toastId = useRef(null);

  // Redux
  const { course, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.teaching.edit
  );
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // Image
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (newImageFile) => {
    setImageFile(newImageFile);
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
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        intro: course.intro ? course.intro : '',
        level: course.level ? course.level : '',
        totalHours: course.total_hours ? course.total_hours : '',
        tags: course.tags,
      });
    }
  }, [course]);

  const { title, intro, level, totalHours, tags } = formData;

  const descriptionEditorRef = useRef(null);
  const requirementsEditorRef = useRef(null);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTotalHoursChange = (event) => {
    const value = event.target.value;
    if (
      (/^(?!0)\d+$/.test(value) && parseInt(value, 10) <= 200) ||
      value === ''
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalHours: value,
      }));
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
    }
  };

  const handleTagDelete = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((tag) => tag.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData();

    // Append text fields to formData
    form.append('title', formData.title);
    form.append('intro', formData.intro);
    form.append('level', formData.level);
    form.append('total_hours', formData.totalHours);
    form.append('category', selectedCategoryId);
    form.append('description', descriptionEditorRef.current.getContent());
    form.append('requirements', requirementsEditorRef.current.getContent());
    const tagsJsonString = JSON.stringify(formData.tags);
    form.append('tags', tagsJsonString);
    // Append the image file if it has been selected
    if (imageFile) {
      form.append('image', imageFile);
    }

    dispatch(updateCourse({ id: course.id, updatedCourse: form }));
    toastId.current = toast.loading('Saving changes...', {
      autoClose: false,
      isLoading: true,
    });
  };

  useEffect(() => {
    if (isSuccess) {
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
    }

    if (isError) {
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
        <Typography variant='h3' mb={STD_MARGIN_TOP}>
          Information
        </Typography>

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
        />
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

        {/* Intro */}
        <TextField
          label={<Typography variant='h5'>Introduction</Typography>}
          value={intro}
          onChange={handleFormChange}
          name='intro'
          multiline
          rows={3}
          focused
          variant='outlined'
          fullWidth
          sx={{ marginTop: STD_MARGIN_TOP }}
          InputProps={{
            inputProps: {
              maxLength: 300,
            },
          }}
          helperText='Max. 300 characters'
          placeholder='Displayed at the search and promo pages right below the title of the course.'
        />

        <Box
          sx={{
            marginTop: STD_MARGIN_TOP,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Completion time */}
          <TextField
            value={totalHours}
            onChange={handleTotalHoursChange}
            name='totalHours'
            focused
            label={
              <Typography variant='h5'>Expected Time to Complete</Typography>
            }
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>hours</InputAdornment>
              ),
            }}
            sx={{ width: 225 }}
            helperText='Max. 200 hours'
          />

          {/* Level */}
          <FormControl sx={{ minWidth: 155 }} focused>
            <InputLabel id='level'>
              <Typography variant='h5' ml={-0.25}>
                Level
              </Typography>
            </InputLabel>
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
          </FormControl>
        </Box>

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
            focused
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
          <Button
            variant='contained'
            color='primary'
            type='submit'
            sx={{ width: '35%' }}
          >
            <Typography variant='h5'>Save</Typography>
          </Button>
        </Box>
      </Box>
    )
  );
}

export default InformationTab;
