import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
  // set up the useHistory hook to navigate
  const history = useHistory();

  // local state to grab inputs from the user
  const [newMovie, setNewMovie] = useState({
    genre_id: '',
    title: '',
    poster: '',
    description: '',
  });

  // set up the redux dispatch
  const dispatch = useDispatch();

  // retrieve the genres from the redux store
  const genres = useSelector((store) => store.genres);

  // send a dispatch to fetch genres on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const saveMovie = (event) => {
    event.preventDefault();
    console.log(`in saveMovie, newMovie =`, newMovie);
  };

  return (
    <div>
      <h2>Add a Movie</h2>
      <form onSubmit={saveMovie}>
        <input
          type="text"
          placeholder="Movie Title"
          required
          value={newMovie.title}
          onChange={(event) =>
            setNewMovie({ ...newMovie, title: event.target.value })
          }
        />
        <input
          type="text"
          required
          placeholder="Movie Poster URL"
          value={newMovie.poster}
          onChange={(event) =>
            setNewMovie({ ...newMovie, poster: event.target.value })
          }
        />
        <textarea
          name="description"
          required
          id=""
          cols="30"
          rows="10"
          placeholder="Add Movie Description"
          value={newMovie.description}
          onChange={(event) =>
            setNewMovie({ ...newMovie, description: event.target.value })
          }
        ></textarea>
        <select
          name="genres"
          id="genres"
          onChange={(event) =>
            setNewMovie({ ...newMovie, genre: event.target.value })
          }
        >
          <option hidden>Select Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} name={genre.name} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button onClick={() => history.push('/')}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddMovie;
