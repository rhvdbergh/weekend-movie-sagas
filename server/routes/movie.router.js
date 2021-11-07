const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  // if there is a req.params.search, we send a different query:

  console.log(`this is req.query`, req.query.search);
  // this is the default query
  let query = `SELECT * FROM movies ORDER BY "title" ASC LIMIT 10`;

  // we also want to use the same pool, no need to do double duty
  // we're going to use a spread to enter our arguments
  let params = [query];

  // but if there is a req.body.search, we will do:
  if (req.query.search) {
    query = `SELECT * FROM "movies" WHERE "title" ILIKE $1 ORDER BY "title" ASC`;
    // there will be no limit to the above query, as the user wants all the titles by that search term
    // we want to also pass this as an argument to pool.query,
    // including the wildcard operators, so:
    params = [query, [`%${req.query.search}%`]];
  }

  console.log(`this is params`, params);

  pool
    .query(...params) // using a spread to have dynamic arguments
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Now handle the genre references
      // since this is the same procedure for update and add,
      // we extract this code into a helper function
      // we pass it req and res and the id of the movie in the db
      insertGenres(req, createdMovieId, res);

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  console.log(`in the put with id`, req.params.id);
  const updateMovieQuery = `
    UPDATE "movies"
    SET "title" = $1, "poster" = $2, description = $3
    WHERE "id" = $4;
  `;

  // do the sql query
  pool
    .query(updateMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
      req.params.id,
    ])
    .then((response) => {
      // now we'll have to do a second query to update the genres
      // first we'll have to delete all the current entries - we don't
      // know what has changed; then we update with the new genres
      let deleteQuery = `
        DELETE FROM "movies_genres"
        WHERE "movie_id" = $1;
      `;

      pool
        .query(deleteQuery, [req.params.id])
        .then((response) => {
          // since this is the same procedure for update and add,
          // we extract this code into a helper function
          // we pass it req and res and the id of the movie in the db
          insertGenres(req, req.params.id, res);
        })
        .catch((err) => {
          // second catch, for delete
          console.log(`error in the delete catch on update`, err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      // catch for the first query
      console.log(`error in the update query on update`, err);
      res.sendStatus(500);
    });
});

// GET route /api/movie/id to retrieve selected movie details
router.get('/:id', (req, res) => {
  console.log(`in the get with id`, req.params.id);
  // build a search query to retrieve this movie details
  // this will retrieve the movie with an array of the genres of that movie
  let query = `
  SELECT "movies"."id", "movies"."title", "movies"."poster", "movies"."description", ARRAY_AGG ( "genres"."name") "genres" FROM "movies" 
  JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
  JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
  WHERE "movies"."id" = $1
  GROUP BY "movies"."id", "movies"."title", "movies"."poster", "movies"."description";
  `;

  // parameterize the inputs
  let values = [req.params.id];

  // run the sql query
  pool
    .query(query, values)
    .then((response) => {
      // we only want one movie, so send the first object in the array
      res.send(response.rows[0]); // the movie will live in .rows
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// this function is used by both the post new movie and update movie routes
function insertGenres(req, createdMovieId, res) {
  // build the insertMoviesGenreQuery, adding as many genres
  // as necessary

  // the code below will result in the following for a movie with two genres:
  /*
        INSERT INTO "movies_genres" ("movie_id", "genre_id")
        VALUES ($1, $2), ($1, $3);
      */
  // and the genreIdValues will hold the values sent from the user
  // in order: $2 = genreIdValues[0], $3 = genreIdValues[1], etc.

  // first we have the insert statement
  let insertMovieGenreQuery = `
        INSERT INTO "movies_genres" ("movie_id", "genre_id")
        VALUES
      `;
  // then we create an array variable to hold the values of SQL queries from $2 onwards
  // depending on how many genres we have
  const genreIdValues = [];
  // then we add as many genres as there are in the array
  for (let i = 0; i < req.body.genres.length; i++) {
    // we want to start counting from 2 onwards to form $2 etc., so add 2 here to i
    insertMovieGenreQuery += ` ($1, $${i + 2})`;
    // add a comma to each to separate the sql values, but not for the last one
    if (i === req.body.genres.length - 1) {
      // for the final one, we want to add ;
      insertMovieGenreQuery += `;`;
    } else {
      insertMovieGenreQuery += `,`;
    }
    // now push the value associated with that index to the genreIdValues
    genreIdValues.push(req.body.genres[i]);
  }

  console.log(`this is the insert movie query:`, insertMovieGenreQuery);

  // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
  pool
    .query(insertMovieGenreQuery, [createdMovieId, ...genreIdValues])
    .then((result) => {
      //Now that both are done, send back success!
      res.sendStatus(201);
    })
    .catch((err) => {
      // catch for second query
      console.log(err);
      res.sendStatus(500);
    });
}

module.exports = router;
