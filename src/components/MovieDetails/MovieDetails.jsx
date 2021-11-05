import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();

  return <p>Movie Details Page {id}</p>;
}

export default MovieDetails;
