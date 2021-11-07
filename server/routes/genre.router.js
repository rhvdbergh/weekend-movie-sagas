const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  // build the sql query
  let query = `
    SELECT * FROM "genres";
  `;

  // run the query
  pool
    .query(query)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('ERROR: Get all genres', err);
      res.sendStatus(500);
    });
});

// delete a genre from the db
router.delete('/:id', (req, res) => {
  console.log(`in /api/genre/:id with id`, req.params.id);
  // build the sql query
  // first delete all references in the "movies_genres" table
  let query = `
    DELETE FROM "movies_genres" 
    WHERE "genre_id" = $1;
  `;

  pool
    .query(query, [req.params.id])
    .then((response) => {
      // now remove any references in the "genres" table
      let query = `
         DELETE FROM "genres"
          WHERE "id" = $1;
      `;

      // run the query
      pool
        .query(query, [req.params.id])
        .then((response) => {
          res.sendStatus(200); // both the movies_genres and genres references have been deleted
        })
        .catch((err) => {
          console.log('ERROR: delete a genre for genres table', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('ERROR: delete a genre for movies_genres table', err);
      res.sendStatus(500);
    });
});

// add a genre to the db
router.post('/', (req, res) => {
  console.log(`in /api/genre/post`);
  // build the sql query
  let query = `
    INSERT INTO "genres" ("name")
    VALUES ($1);
  `;

  // run the query
  pool
    .query(query, [req.body.genre])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('ERROR: add a genre', err);
      res.sendStatus(500);
    });
});

module.exports = router;
