import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import Navbar from '../Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Navbar />
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/add"></Route>
        <AddMovie />
      </Router>
    </div>
  );
}

export default App;
