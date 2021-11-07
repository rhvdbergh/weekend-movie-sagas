import { Box, Container, Typography, ButtonGroup, Button } from '@mui/material';
import { useHistory } from 'react-router';

function Navbar() {
  // setup useHistory hook
  const history = useHistory();

  return (
    <ButtonGroup variant="contained" sx={{ mt: '20px', mb: '30px' }}>
      <Button variant="contained" onClick={() => history.push('/')}>
        Movie List
      </Button>
      <Button variant="contained" onClick={() => history.push('/add')}>
        Add Movie
      </Button>
    </ButtonGroup>
  );
}

export default Navbar;
