import { useTheme } from '@emotion/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Drawer,
  FormControlLabel,
  List,
  Radio,
  RadioGroup,
  Rating,
  Toolbar,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import NestedCategories from './NestedCategories';
import { useSelector } from 'react-redux';
import TagsChecboxList from './TagsChecboxList';
import PriceFilters from './PriceFilters';

function SearchFiltersDrawer({ open, toggle, isXsScreen, filterState, width }) {
  const theme = useTheme();
  const transitionDuration = theme.transitions.duration.standard;

  const { categories, isLoading } = useSelector((state) => state.category);
  const { tags } = useSelector((state) => state.catalog);

  const [expandedAccordions, setExpandedAccordions] = useState({
    ratingAcc: true,
    categoriesAcc: true,
    tagsAcc: false,
    priceAcc: false,
  });

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpandedAccordions((prevState) => ({
      ...prevState,
      [panel]: isExpanded,
    }));
  };

  const [filters, setFilters] = filterState;
  const { average_rating__gte } = filters;

  const handleFilterChange = (event) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      page: 1,
      [event.target.name]: event.target.value,
    }));
  };

  const filtersList = (
    <List>
      {/* Ratings Filter */}
      <Accordion
        disableGutters
        expanded={expandedAccordions.ratingAcc}
        onChange={handleChangeAccordion('ratingAcc')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='subtitle1'>Ratings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            value={average_rating__gte}
            name='average_rating__gte'
            onChange={handleFilterChange}
          >
            <FormControlLabel
              value='4.5'
              control={<Radio />}
              label={
                <Box display='flex' alignItems='center'>
                  <Rating
                    name='read-only'
                    value={4.5}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                  <Typography variant='body1' component='span' marginLeft={1}>
                    4.5 & up
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value='4'
              control={<Radio />}
              label={
                <Box display='flex' alignItems='center'>
                  <Rating
                    name='read-only'
                    value={4}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                  <Typography variant='body1' component='span' marginLeft={1}>
                    4.0 & up
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value='3.5'
              control={<Radio />}
              label={
                <Box display='flex' alignItems='center'>
                  <Rating
                    name='read-only'
                    value={3.5}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                  <Typography variant='body1' component='span' marginLeft={1}>
                    3.5 & up
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value='3'
              control={<Radio />}
              label={
                <Box display='flex' alignItems='center'>
                  <Rating
                    name='read-only'
                    value={3}
                    precision={0.5}
                    readOnly
                    size='small'
                  />
                  <Typography variant='body1' component='span' marginLeft={1}>
                    3.0 & up
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      {/* Categories Filter */}
      <Accordion
        disableGutters
        expanded={expandedAccordions.categoriesAcc}
        onChange={handleChangeAccordion('categoriesAcc')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='subtitle1'>Categories</Typography>
        </AccordionSummary>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <NestedCategories categories={categories} setFilters={setFilters} />
        )}
      </Accordion>

      {/* Price Filter */}
      <Accordion
        disableGutters
        expanded={expandedAccordions.tagsAcc}
        onChange={handleChangeAccordion('tagsAcc')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='subtitle1'>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceFilters setFilters={setFilters} />
        </AccordionDetails>
      </Accordion>

      {/* Tags Filter */}
      <Accordion
        disableGutters
        expanded={expandedAccordions.priceAcc}
        onChange={handleChangeAccordion('priceAcc')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='subtitle1'>Topics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {tags.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TagsChecboxList tags={tags.list} setFilters={setFilters} />
          )}
        </AccordionDetails>
      </Accordion>

      {/* Other filters would be structured similarly */}
    </List>
  );

  return !isXsScreen ? (
    <Box
      sx={{
        position: 'relative',
        mt: 2,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: transitionDuration,
        }),
        maxWidth: width,
      }}
    >
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            zIndex: 1,
            transition: theme.transitions.create('transform', {
              easing: theme.transitions.easing.sharp,
              duration: transitionDuration,
            }),
            transform: open ? 'translateX(0)' : `translateX(-${width}px)`,
            maxWidth: width,
          }}
        >
          {filtersList}
        </Box>
      )}
    </Box>
  ) : (
    <Drawer
      variant='temporary'
      open={open}
      anchor='right'
      onClose={toggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <Toolbar />
      {filtersList}
    </Drawer>
  );
}

export default SearchFiltersDrawer;
