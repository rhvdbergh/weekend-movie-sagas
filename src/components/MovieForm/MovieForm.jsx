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

// initial state of newMovie for add mode
const initialNewMovieState = {
  genres: [],
  title: '',
  poster: '',
  description: '',
};

// this form is used both to add and edit movies
// the inEditMode prop tells us which mode we're in
function MovieForm({ inEditMode }) {
  // set up the useHistory hook to navigate
  const history = useHistory();

  // retrieve the genres from the redux store
  const genres = useSelector((store) => store.genres);
  // if this is in edit mode, retrieve the movie to be edited from the redux store
  // also, set the id param with the useParams hook
  const selectedMovie = useSelector((store) => store.selectedMovie);
  const { id: selectedMovieId } = useParams();

  // local state to grab inputs from the user
  const [newMovie, setNewMovie] = useState(initialNewMovieState);

  // set up the redux dispatch
  const dispatch = useDispatch();

  // send a dispatch to fetch genres on page load
  // also, fetch selected movie if in edit mode
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
    // if in edit mode, retrieve the selected movie
    if (inEditMode) {
      dispatch({ type: 'FETCH_SELECTED_MOVIE', payload: selectedMovieId });
    }
  }, []);

  // once we have a selected movie, set the movie page to that movie
  useEffect(() => {
    if (inEditMode) {
      // to set the selected options for edit mode,
      // we need the genre ids of the selectedMovie's genres
      // but we only have the names, so we have to filter through
      // and return all the corresponding genres if their names match
      // but we have to supply here an arry of numbers, not objects
      // so we have to do a map on the returned array, which contains objects
      // and pick out only the ids from those objects
      setNewMovie({
        ...selectedMovie,
        genres: genres
          .filter((genre) => selectedMovie.genres.includes(genre.name))
          .map((genre) => genre.id),
      });
    }
  }, [selectedMovie]);

  const saveMovie = (event) => {
    event.preventDefault();
    // validate whether each field is filled out
    if (
      newMovie.genres.length > 0 &&
      newMovie.title !== '' &&
      newMovie.poster !== '' &&
      newMovie.description !== ''
    ) {
      // if in add mode, add this movie
      if (!inEditMode) {
        dispatch({ type: 'ADD_MOVIE', payload: newMovie });
      } else {
        // we're in edit mode, so update this movie
        dispatch({ type: 'UPDATE_MOVIE', payload: newMovie });
      }
      // reset newMovie
      setNewMovie(initialNewMovieState);
      // navigate back to the home page
      history.push('/');
    } else {
      // one of the fields were not filled out
      alert(`Please fill out all the fields and select at least one genre.`);
    }
  };

  return (
    <Container sx={{ mt: '30px', display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={12}
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
            <InputLabel id="select-genres-label">Select Genre</InputLabel>
            <Select
              labelId="select-genres-label"
              id="select-genres"
              label="Select Genres"
              multiple
              value={newMovie.genres}
              onChange={(event) =>
                setNewMovie({ ...newMovie, genres: event.target.value })
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
            <Typography variant="h6">
              {inEditMode ? `Update` : `Save`}
            </Typography>
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default MovieForm;
