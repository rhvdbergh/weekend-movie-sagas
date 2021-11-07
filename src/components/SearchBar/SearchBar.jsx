import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function SearchBar() {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // local state to keep track of user input in the search
  const [search, setSearch] = useState('');

  // searching will fetch the default movies with a useEffect
  // every time search changes (because the user inputs a character)
  // this will fetch the movies
  useEffect(() => {
    dispatch({ type: 'SEARCH_MOVIE_TITLE', payload: search });
  }, [search]);

  return (
    <TextField
      sx={{ m: '10px', width: '300px' }}
      type="text"
      required
      variant="standard"
      label="Search"
      size="small"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  );
}

export default SearchBar;
