import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CityField = ({ city, setCity }) => {
  const [address, setAddress] = React.useState(city);
  const [suggestions, setSuggestions] = React.useState([]);

  const handleSelect = async (value) => {
    setAddress(value);
    setCity(value);
    // Additional logic such as geocoding can go here if needed
  };

  const handleChange = (value) => {
    setAddress(value);
  };

  const searchOptions = {
    types: ['(cities)'], // this will restrict the search to cities only
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Autocomplete
          freeSolo
          inputValue={address}
          onInputChange={(_, newInputValue) => {
            handleChange(newInputValue);
          }}
          fullWidth
          options={suggestions.map((suggestion) => suggestion.description)}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              {...getInputProps({
                label: 'City',
              })}
              variant='outlined'
              fullWidth
              margin='none'
            />
          )}
          renderOption={(props, option) => {
            const suggestion = suggestions.find((sug) => sug.description === option);
            return (
              <li key={option} {...getSuggestionItemProps(suggestion, props)}>
                {option}
              </li>
            );
          }}
        />
      )}
    </PlacesAutocomplete>
  );
};

export default CityField;
