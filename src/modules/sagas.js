// Import saga middleware
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_SELECTED_MOVIE', fetchSelectedMovie);
  yield takeEvery('FETCH_GENRES', fetchGenres);
  yield takeEvery('ADD_MOVIE', addMovie);
  yield takeEvery('UPDATE_MOVIE', updateMovie);
  yield takeEvery('SEARCH_MOVIE_TITLE', searchMovies);
  yield takeEvery('VALIDATE_LOGIN', validateLogin);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get('/api/movie');
    console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch {
    console.log('get all error');
  }
}

function* searchMovies(action) {
  try {
    const movies = yield axios.get(`/api/movie?search=${action.payload}`);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch {
    console.log('search by title error in searchMovies', err);
  }
}

// fetches the details of the selected movie from the server
function* fetchSelectedMovie(action) {
  console.log(`in fetchSelectedMovie, fetching id`, action.payload);
  try {
    // do an axios call to our server to fetch data
    const response = yield axios.get(`/api/movie/${action.payload}`);
    // once we have the data, fire of an action so the reducer can store it
    yield put({ type: 'SET_SELECTED_MOVIE', payload: response.data });
  } catch (err) {
    console.log('get selected movie error:', err);
  }
}

// fetches all the genres
function* fetchGenres(action) {
  try {
    // send an axios call to retrieve all the genres
    const response = yield axios.get('/api/genre');
    yield put({ type: 'SET_GENRES', payload: response.data });
  } catch (err) {
    console.log('fetch genres error:', err);
  }
}

// adds a movie to the database via the server
function* addMovie(action) {
  try {
    const response = yield axios.post('/api/movie', action.payload);
  } catch (err) {
    console.log('add movie error:', err);
  }
}

// updates a movie on the database via the server
function* updateMovie(action) {
  try {
    console.log(`in updateMovie, and this is the movie object`, action.payload);
    const response = yield axios.put(
      `/api/movie/${action.payload.id}`,
      action.payload
    );
  } catch (err) {
    console.log('update movie error:', err);
  }
}

// validates whether the user is logged in
function* validateLogin(action) {
  try {
    // this is not really how it should be done, with queries
    // we should use more secure information!
    // but this is what the assignment calls for
    const response = yield axios.get(
      `/api/login?u=${action.payload.username}&p=${action.payload.password}`
    );
    yield put({ type: 'SET_USER_LOGIN', payload: response.data.login });
  } catch (err) {
    console.log('login response error:', err);
  }
}

export default rootSaga;
