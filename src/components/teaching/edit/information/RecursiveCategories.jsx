import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Typography,
  Radio,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

function RecursiveCategories({ category }) {
  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;

  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={hasSubcategories ? <ExpandMoreIcon /> : null}
        aria-controls={`panel-${category.id}-content`}
        id={`panel-${category.id}-header`}
      >
        <FormControlLabel
          aria-label={`radio-${category.id}`}
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          control={<Radio />}
          value={category.id}
          label={<Typography variant='body1'>{category.name}</Typography>}
        />
      </AccordionSummary>
      {hasSubcategories && (
        <AccordionDetails>
          {category.subcategories.map((subcategory) => (
            <RecursiveCategories key={subcategory.id} category={subcategory} />
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export default RecursiveCategories;
