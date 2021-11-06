import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import { Box, Container, Typography, ButtonGroup, Button } from '@mui/material';

function App() {
  // set up history to navigate
  const history = useHistory();

  return (
    <Container className="App">
      <Typography variant="h2">The Movies Saga!</Typography>
      <Router>
        <ButtonGroup variant="contained" sx={{ mt: '20px', mb: '30px' }}>
          <Link to="/">Movie List</Link>
          <Link to="/add">Add Movie</Link>
        </ButtonGroup>
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
    </Container>
  );
}

export default App;
