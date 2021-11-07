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
  let query = `
    DELETE FROM "genres"
    WHERE "id" = $1;
  `;
  pool
    .query(query, [req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('ERROR: delete a genre', err);
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
