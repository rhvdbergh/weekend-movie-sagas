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

module.exports = router;
