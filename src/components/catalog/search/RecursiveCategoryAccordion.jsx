import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

function RecursiveCategoryAccordion({ category, handleToggle, checkedState }) {
  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;
  const isChecked = checkedState[category.id] || false;

  const handleCheckChange = (event) => {
    handleToggle(
      category.id,
      event.target.checked,
      hasSubcategories ? category.subcategories : []
    );
  };

  return (
    <Accordion
      disableGutters
      expanded={hasSubcategories && checkedState[`panel-${category.id}`]}
    >
      <AccordionSummary
        expandIcon={hasSubcategories ? <ExpandMoreIcon /> : null}
        aria-controls={`panel-${category.id}-content`}
        id={`panel-${category.id}-header`}
      >
        <FormControlLabel
          aria-label={`checkbox-${category.id}`}
          onClick={(event) => event.stopPropagation()}
          onFocus={(event) => event.stopPropagation()}
          control={
            <Checkbox checked={isChecked} onChange={handleCheckChange} />
          }
          label={<Typography variant='body1'>{category.name}</Typography>}
        />
      </AccordionSummary>
      {hasSubcategories && (
        <AccordionDetails>
          {category.subcategories.map((subcategory) => (
            <RecursiveCategoryAccordion
              key={subcategory.id}
              category={subcategory}
              handleToggle={handleToggle}
              checkedState={checkedState}
            />
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export default RecursiveCategoryAccordion;
