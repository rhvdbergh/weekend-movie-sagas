import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <nav>
          <Link to="/">Movie List</Link>
          <Link to="/add">Add Movie</Link>
        </nav>
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/add" exact>
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
