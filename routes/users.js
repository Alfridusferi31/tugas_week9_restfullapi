var express = require('express');
var router = express.Router();
var { signToken } = require('../utils/auth.js');

var pool = require('../query.js');

router.post('/login', (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [req.body.email, req.body.password],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        const token = signToken(results.rows[0]);
        res.json({
          token: token,
        });
      }
    }
  );
});

module.exports = router;
