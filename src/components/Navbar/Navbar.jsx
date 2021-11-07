import { Box, Container, Typography, ButtonGroup, Button } from '@mui/material';
import { useHistory } from 'react-router';
import SearchBar from '../SearchBar/SearchBar';

function Navbar({ displaySearch }) {
  // setup useHistory hook
  const history = useHistory();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <ButtonGroup variant="contained" sx={{ mt: '20px', mb: '30px' }}>
        <Button variant="contained" onClick={() => history.push('/')}>
          Movie List
        </Button>
        <Button variant="contained" onClick={() => history.push('/add')}>
          Add Movie
        </Button>
        <Button variant="contained" onClick={() => history.push('/admin')}>
          Admin
        </Button>
      </ButtonGroup>
      {/* we do this conditional to display an empty box instead of search to
      keep the spacing consistent */}
      {displaySearch ? <SearchBar /> : <Box />}
    </Box>
  );
}

export default Navbar;
