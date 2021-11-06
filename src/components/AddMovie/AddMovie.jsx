import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
} from '@mui/material';

// initial state of newMovie
const initialNewMovieState = {
  genre_id: '',
  title: '',
  poster: '',
  description: '',
};

function AddMovie() {
  // set up the useHistory hook to navigate
  const history = useHistory();

  // local state to grab inputs from the user
  const [newMovie, setNewMovie] = useState(initialNewMovieState);

  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the genres from the redux store
  const genres = useSelector((store) => store.genres);

  // send a dispatch to fetch genres on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const saveMovie = (event) => {
    event.preventDefault();
    // validate whether a genre is selected
    if (newMovie.genre_id !== '') {
      dispatch({ type: 'ADD_MOVIE', payload: newMovie });
      // reset newMovie
      setNewMovie(initialNewMovieState);
      // navigate back to the home page
      history.push('/');
    } else {
      alert(`Please select a movie genre.`);
    }
  };

  return (
    <Container sx={{ mt: '30px', display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation="12"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '700px',
          p: '50px',
        }}
      >
        <FormControl sx={{ width: '100%' }}>
          <Typography variant="h4" sx={{ mb: '30px' }}>
            Add a Movie
          </Typography>
          <TextField
            sx={{ m: '10px' }}
            type="text"
            label="Movie Title"
            required
            value={newMovie.title}
            onChange={(event) =>
              setNewMovie({ ...newMovie, title: event.target.value })
            }
          />
          <TextField
            sx={{ m: '10px' }}
            type="text"
            required
            label="Movie Poster URL"
            value={newMovie.poster}
            onChange={(event) =>
              setNewMovie({ ...newMovie, poster: event.target.value })
            }
          />
          <TextField
            sx={{ m: '10px' }}
            required
            multiline
            rows="6"
            required
            label="Add Movie Description"
            value={newMovie.description}
            onChange={(event) =>
              setNewMovie({ ...newMovie, description: event.target.value })
            }
          ></TextField>
        </FormControl>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-evenly',
            mt: '10px',
          }}
        >
          <FormControl sx={{ width: '53%' }}>
            <InputLabel id="select-genre-label">Select Genre</InputLabel>
            <Select
              labelId="select-genre-label"
              id="select-genre"
              label="Select Genre"
              value={newMovie.genre_id}
              onChange={(event) =>
                setNewMovie({ ...newMovie, genre_id: event.target.value })
              }
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{ height: '56px', width: '21%' }}
            variant="contained"
            color="error"
            onClick={() => history.push('/')}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={saveMovie}
            sx={{ height: '56px', width: '21%' }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddMovie;
