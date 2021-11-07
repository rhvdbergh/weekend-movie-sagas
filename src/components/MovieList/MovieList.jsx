import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';

function MovieList() {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // fetch the data from the redux store
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    // in order for the old selected movie not to flash-display at first
    // page load, we need to clear it here
    dispatch({ type: 'RESET_SELECTED_MOVIE' });
  }, []);

  return (
    <main>
      <section className="movies">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </section>
    </main>
  );
}

export default MovieList;
