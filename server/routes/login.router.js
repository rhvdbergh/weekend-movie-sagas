const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// checks to see if user is logged in
// this is the full route: /api/login
// we expect queries of u (username) and p (password)
router.get('/', (req, res) => {
  if (
    req.query.p === process.env.PASSWORD &&
    req.query.u === process.env.USERNAME
  ) {
    res.send({ login: true });
  } else {
    res.send({ login: false });
  }
});

module.exports = router;
