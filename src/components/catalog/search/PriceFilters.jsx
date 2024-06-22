import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PriceFilters({ setFilters }) {
  const [searchParams] = useSearchParams();

  // initialize price filters from search params
  useEffect(() => {
    const initializePriceFilters = () => {
      const price__lte = searchParams.get('price__lte') || '';
      const price__gte = searchParams.get('price__gte') || '';

      if (price__lte === '0') {
        return 'free';
      } else if (Number(price__gte) > 0) {
        return 'paid';
      }
      return '';
    };

    setSelected(initializePriceFilters());
  }, [searchParams]);

  const [selected, setSelected] = useState(''); // free, paid

  const handlePriceChange = (event) => {
    const newSelected = event.target.value;
    setSelected(newSelected);
    setFilters((currentFilters) => {
      const newFilters = { ...currentFilters, page: 1 };
      switch (newSelected) {
        case 'free':
          newFilters['price__lte'] = '0';
          newFilters['price__gte'] = '';
          break;
        case 'paid':
          newFilters['price__gte'] = '1';
          newFilters['price__lte'] = '';
          break;
        default:
          delete newFilters['price__gte'];
          delete newFilters['price__lte'];
      }

      return newFilters;
    });
  };

  return (
    <Stack>
      <RadioGroup value={selected} onChange={handlePriceChange}>
        <FormControlLabel
          value='free'
          control={<Radio />}
          label={<Typography variant='body1'>Free</Typography>}
        />
        <FormControlLabel
          value='paid'
          control={<Radio />}
          label={<Typography variant='body1'>Paid</Typography>}
        />
      </RadioGroup>
    </Stack>
  );
}

export default PriceFilters;
