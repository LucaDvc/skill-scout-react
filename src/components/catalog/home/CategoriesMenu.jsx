import React, { useState } from 'react';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const CategoriesMenu = ({ categories, loading }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <Divider />
      <Box onMouseLeave={handleMouseLeave}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            bgcolor: 'primary.main',
            py: 1,
            width: '100%',
            position: 'static',
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant='text'
                  sx={{
                    fontSize: '1rem',
                    bgcolor: 'secondary.main',
                    width: '7%',
                  }}
                />
              ))
            : categories.map((category) => (
                <Link
                  to={`/catalog/search?categories=${category.name}&page=1`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                  }}
                  key={category.id}
                  onMouseEnter={() => handleMouseEnter(category)}
                >
                  <Typography
                    color='secondary'
                    variant='button'
                    sx={{
                      display: 'flex',
                      alignContent: 'center',
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    {category.name}
                    {activeCategory?.id === category.id ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )}
                  </Typography>
                </Link>
              ))}
        </Box>
        {activeCategory && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'secondary.main',
              py: 1,
              width: '100%',
              position: 'absolute',
              left: 0,
              right: 0,
              zIndex: 1200,
            }}
          >
            {activeCategory.subcategories.map((subCategory) => (
              <Link
                to={`/catalog/search?categories=${subCategory.name}&page=1`}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  color: 'white',
                }}
                key={subCategory.id}
              >
                <Typography
                  sx={{
                    mx: 2,
                    '&:hover': {
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    },
                  }}
                  variant='button'
                >
                  {subCategory.name}
                </Typography>
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default CategoriesMenu;
