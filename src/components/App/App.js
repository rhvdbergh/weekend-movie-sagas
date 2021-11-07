import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import { Container, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import AdminPage from '../AdminPage/AdminPage';

function App() {
  return (
    <Container className="App">
      <Typography variant="h2">The Movies Saga!</Typography>
      <Router>
        <Route path="/" exact>
          <Navbar displaySearch={true} />
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id">
          <Navbar />
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/add" exact>
          <Navbar />
          <MovieForm inEditMode={false} />

          {/* Edit Movie page */}
        </Route>
        <Route path="/edit/:id">
          <Navbar />
          <MovieForm inEditMode={true} />
        </Route>

        {/* Admin page */}
        <Route path="/admin" exactly>
          <Navbar />
          <AdminPage />
        </Route>
      </Router>
    </Container>
  );
}

export default App;
