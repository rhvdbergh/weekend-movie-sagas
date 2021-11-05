import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function AddMovie() {
  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the genres from the redux store
  // TODO:

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
      <select name="genres" id="genres">
        <option hidden>Select Genres</option>
      </select>
    </div>
  );
}

export default AddMovie;
