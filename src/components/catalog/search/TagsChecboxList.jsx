import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function TagsCheckboxList({ tags, setFilters }) {
  const [searchParams] = useSearchParams();

  // Initialize the checkedState with the tags, ensuring that every tag is accounted for.
  const [checkedState, setCheckedState] = useState(
    tags.reduce((state, tag) => ({ ...state, [tag.id]: false }), {})
  );

  // Synchronize the checkedState with the URL search parameters.
  useEffect(() => {
    const tagsFromParams =
      searchParams.get('tags')?.split(',').map(decodeURIComponent) || [];

    const initCheckedState = tags.reduce((state, tag) => {
      state[tag.id] = tagsFromParams.includes(tag.name);
      return state;
    }, {});

    setCheckedState(initCheckedState);
  }, [searchParams, tags]);

  const handleChange = (tagId, isChecked) => {
    setCheckedState((prevState) => {
      const newCheckedState = {
        ...prevState,
        [tagId]: isChecked,
      };

      const selectedTagNames = Object.entries(newCheckedState)
        .filter(([key, value]) => value)
        .map(([key]) => tags.find((tag) => tag.id.toString() === key)?.name);

      const tagsQueryParams = selectedTagNames.filter(Boolean).join(',');
      setFilters((prevState) => ({
        ...prevState,
        tags: tagsQueryParams,
      }));

      return newCheckedState;
    });
  };

  return (
    <Stack>
      {tags.map((tag) => (
        <FormControlLabel
          key={tag.id}
          control={
            <Checkbox
              checked={!!checkedState[tag.id]}
              onChange={(event) => handleChange(tag.id, event.target.checked)}
            />
          }
          label={<Typography variant='body1'>{tag.name}</Typography>}
        />
      ))}
    </Stack>
  );
}

export default TagsCheckboxList;
