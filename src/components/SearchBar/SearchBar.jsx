import { Box, TextField } from '@mui/material';

function SearchBar() {
  return (
    <TextField
      sx={{ m: '10px', width: '300px' }}
      type="text"
      required
      variant="standard"
      label="Search"
      size="small"
    />
  );
}

export default SearchBar;
