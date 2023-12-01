import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/catalog/catalogSlice';
import Button from '@mui/material/Button';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';

const CategoriesMenu = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.catalog);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <Box onMouseLeave={handleMouseLeave}>
      <AppBar position='static' color='primary'>
        <Divider />

        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onMouseEnter={() => handleMouseEnter(category)}
              sx={{ color: 'white', display: 'block' }}
            >
              {category.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      {activeCategory && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'secondary.main',
            py: 1,
            width: '100%',
            zIndex: 1200,
          }}
        >
          {activeCategory.subcategories.map((subCategory) => (
            <Typography
              key={subCategory.id}
              sx={{
                mx: 2,
                color: 'white',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {subCategory.name}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CategoriesMenu;
