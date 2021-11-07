import {
  FormControl,
  Paper,
  TextField,
  Container,
  Typography,
  Box,
  Button,
  ButtonGroup,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AdminLogin() {
  // local state for the inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // set up the useHistory hook
  const history = useHistory();

  // set up the redux dispatch
  const dispatch = useDispatch();

  return (
    <Container sx={{ mt: '30px', display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '700px',
          p: '50px',
        }}
      >
        <Typography variant="h4">Login</Typography>
        <FormControl>
          <TextField
            sx={{ m: '10px' }}
            type="text"
            variant="standard"
            label="Username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            sx={{ m: '10px' }}
            type="text"
            variant="standard"
            label="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <ButtonGroup
          sx={{ display: 'flex', justifyContent: 'right', mt: '40px' }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => history.push('/')}
          >
            Return
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({
                type: 'VALIDATE_LOGIN',
                payload: { username, password },
              });
            }}
          >
            Login
          </Button>
        </ButtonGroup>
      </Paper>
    </Container>
  );
}

export default AdminLogin;
