import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_SELECTED_MOVIE', fetchSelectedMovie);
  yield takeEvery('FETCH_GENRES', fetchGenres);
  yield takeEvery('ADD_MOVIE', addMovie);
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
    // navigate back to the home page
    yield history.push('/');
  } catch (err) {
    console.log('add movie error:', err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie for which details are being viewed
const selectedMovie = (state = { genre_id: '' }, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MOVIE':
      return action.payload;
    case 'RESET_SELECTED_MOVIE':
      return {};
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    selectedMovie,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
