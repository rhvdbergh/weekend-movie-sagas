import { Typography, Card, CardMedia, CardContent, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';

function MovieCard({ movie }) {
  // set up the useHistory hook to navigate with
  const history = useHistory();

  // move to the details page
  const showDetails = () => {
    // navigate to this movie's details page
    history.push(`/details/${movie.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: '185px',
        maxHeight: '350px',
        m: '20px',
      }}
    >
      <CardMedia
        component="img"
        height="275"
        width="185"
        image={movie.poster}
        alt={movie.title}
        onClick={showDetails}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
