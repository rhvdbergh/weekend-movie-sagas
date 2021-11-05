import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // fetch the id of selected movie from the url
  const { id } = useParams();

  // on page load, fetch the details for the movie with this id
  // by doing a dispatch
  useEffect(() => {
    dispatch({ type: 'FETCH_SELECTED_MOVIE', payload: id });
  }, []);

  return <p>Movie Details Page {id}</p>;
}

export default MovieDetails;
