import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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

function MovieForm({ inEditMode }) {
  // set up the useHistory hook to navigate
  const history = useHistory();

  // retrieve the genres from the redux store
  const genres = useSelector((store) => store.genres);
  // if this is in edit mode, retrieve the movie to be edited from the redux store
  // also, set the id param with the useParams hook
  const { id } = useParams();
  const movie = useSelector((store) => store.selectedMovie);

  // local state to grab inputs from the user
  const [newMovie, setNewMovie] = useState(initialNewMovieState);

  // set up the redux dispatch
  const dispatch = useDispatch();

  // send a dispatch to fetch genres on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
    // if in edit mode, retrieve the selected movie
    if (inEditMode) {
      dispatch({ type: 'FETCH_SELECTED_MOVIE', payload: id });
    }
  }, []);

  useEffect(() => {
    if (inEditMode) {
      dispatch({ type: 'FETCH_SELECTED_MOVIE', payload: id });
      setNewMovie(movie);
    }
  }, [id]);

  const saveMovie = (event) => {
    event.preventDefault();
    // validate whether a genre is selected
    if (newMovie.genre_id !== '') {
      dispatch({ type: 'ADD_MOVIE', payload: newMovie });
      // reset newMovie
      setNewMovie(initialNewMovieState);
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
            {inEditMode ? 'Edit' : 'Add'} a Movie
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
            <Typography variant="h6">Cancel</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={saveMovie}
            sx={{ height: '56px', width: '21%' }}
          >
            <Typography variant="h6">Save</Typography>
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default MovieForm;
