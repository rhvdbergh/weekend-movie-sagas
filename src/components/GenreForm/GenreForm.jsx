import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  TextField,
  ButtonGroup,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GenreChip from '../GenreChip/GenreChip';

function GenreForm() {
  // local state to keep track of user input
  const [genre, setGenre] = useState('');

  // set up useHistory hook to navigate
  const history = useHistory();

  // retrieve the genres from the redux store
  const genres = useSelector((store) => store.genres);

  // set up redux dispatch
  const dispatch = useDispatch();

  // set up a useEffect to load genres
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  // delete this genre on the server
  const deleteGenre = (genre) => {
    console.log('in deletegenre, genre is', genre);
    dispatch({ type: 'DELETE_GENRE', payload: genre });
  };

  console.log(`in genreform and genres = `, genres);
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
        <Typography variant="h4">Add Genre</Typography>
        <FormControl>
          <TextField
            sx={{ m: '10px' }}
            type="text"
            variant="standard"
            label="Add Genre"
            required
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </FormControl>
        <ButtonGroup
          sx={{ display: 'flex', justifyContent: 'right', mt: '40px' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({
                type: 'ADD_GENRE',
                payload: genre,
              });
              // reset the input field
              setGenre('');
            }}
          >
            Add Genre
          </Button>
        </ButtonGroup>
        <Typography variant="h4" sx={{ mt: '40px', mb: '40px' }}>
          Remove Genres
        </Typography>
        <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {genres.map((genre) => (
            <GenreChip key={genre.id} genre={genre} deleteGenre={deleteGenre} />
          ))}
        </Stack>
        <ButtonGroup
          sx={{ display: 'flex', justifyContent: 'right', mt: '40px' }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => history.push('/')}
          >
            Return
          </Button>
        </ButtonGroup>
      </Paper>
    </Container>
  );
}

export default GenreForm;
