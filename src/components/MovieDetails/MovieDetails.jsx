import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function MovieDetails() {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // fetch the id of selected movie from the url
  const { id } = useParams();

  // set up the useHistory hook to navigate
  const history = useHistory();

  // fetch the selected movie from the redux store
  const movie = useSelector((store) => store.selectedMovie);

  // on page load, fetch the details for the movie with this id
  // by doing a dispatch
  useEffect(() => {
    dispatch({ type: 'FETCH_SELECTED_MOVIE', payload: id });
    console.log(`the id is`, id);
    console.log(`selectedMovie is`, movie);
  }, [id]);

  return (
    <Container>
      <Box>
        <Typography variant="h5">{movie.title}</Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ m: '30px' }}>
          <img src={movie.poster} alt={movie.title} />
        </Box>
        <Box sx={{ mt: '50px' }}>
          <Typography variant="subtitle1">
            Description: {movie.description}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h6" sx={{ mt: '20px', mr: '23px' }}>
              Genres:
            </Typography>
            {movie.genres &&
              movie.genres.map((genre, index) => (
                <Typography variant="subtitle1" key={index} sx={{ m: '23px' }}>
                  {genre}
                </Typography>
              ))}
          </Box>
        </Box>
      </Box>
      <Button variant="contained" onClick={() => history.push('/')}>
        Back to Movie List
      </Button>
    </Container>
  );
}

export default MovieDetails;
