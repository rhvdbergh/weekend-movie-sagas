import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';

function App() {
  return (
    <Container className="App">
      <Typography variant="h2">The Movies Saga!</Typography>
      <Router>
        <Navbar />
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id">
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/add" exact>
          <MovieForm inEditMode={false} />
        </Route>
        <Route path="/edit/:id">
          <MovieForm inEditMode={true} />
        </Route>
      </Router>
    </Container>
  );
}

export default App;
