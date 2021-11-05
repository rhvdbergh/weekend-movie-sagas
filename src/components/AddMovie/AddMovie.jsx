import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
  // set up the useHistory hook to navigate
  const history = useHistory();

  // local state to grab inputs from the user
  const [newMovieGenre, setNewMovieGenre] = useState();

  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the genres from the redux store
  const genres = useSelector((store) => store.genres);

  // send a dispatch to fetch genres on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  return (
    <div>
      <h2>Add a Movie</h2>
      <input type="text" placeholder="Movie Title" />
      <input type="text" placeholder="Movie Poster URL" />
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        placeholder="Add Movie Description"
      ></textarea>
      {/* TODO: add dropdown here */}
      <select
        name="genres"
        id="genres"
        onChange={(event) => setNewMovieGenre(event.target.value)}
      >
        <option hidden>Select Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} name={genre.name} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <button onClick={() => history.push('/')}>Cancel</button>
      <button>Save</button>
    </div>
  );
}

export default AddMovie;
