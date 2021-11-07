import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootSaga from './sagas.js';

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
const selectedMovie = (state = { genres: [] }, action) => {
  switch (action.type) {
    case 'SET_SELECTED_MOVIE':
      return action.payload;
    case 'RESET_SELECTED_MOVIE':
      return {};
    default:
      return state;
  }
};

// checks whether admin is logged in
const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case 'SET_USER_LOGIN':
      return action.payload;
    default:
      return state;
  }
};

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    selectedMovie,
    isLoggedIn,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
