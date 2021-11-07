import { Chip } from '@mui/material';

function GenreChip({ genre, deleteGenre }) {
  console.log(`in GenreChip, genre is`, genre);
  return (
    <Chip
      label={genre.name}
      sx={{ m: '10px' }}
      onClick={() => deleteGenre(genre.id)}
    />
  );
}

export default GenreChip;
