import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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
    <div>
      <h3>{movie.title}</h3>
      <div>
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div>
        <p>Description: {movie.description}</p>
        <p>Genres:</p>
        {movie.genres &&
          movie.genres.map((genre, index) => <p key={index}>{genre}</p>)}
      </div>
      <button onClick={() => history.push('/')}>Back to Movie List</button>
    </div>
  );
}

export default MovieDetails;
