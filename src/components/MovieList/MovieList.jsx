import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';
import { Typography } from '@mui/material';

function MovieList() {
  // set up the redux dispatch
  const dispatch = useDispatch();
  // set up the useHistory hook to navigate with
  const history = useHistory();
  // fetch the data from the redux store
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    // in order for the old selected movie not to flash-display at first
    // page load, we need to clear it here
    dispatch({ type: 'RESET_SELECTED_MOVIE' });
  }, []);

  // move to the details page
  const showDetails = (event, movie) => {
    // navigate to this movie's details page
    history.push(`/details/${movie.id}`);
  };

  return (
    <main>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <Typography variant="h5">{movie.title}</Typography>
              <img
                src={movie.poster}
                alt={movie.title}
                onClick={() => showDetails(event, movie)}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
