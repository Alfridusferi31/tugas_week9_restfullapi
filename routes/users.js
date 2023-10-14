const express = require("express");
const router = express.Router();
const pool = require("../query.js");
const auth = require("../middleware/authMiddleware.js");

router.use(auth);

router.get("/", function (req, res) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;

  pool.query(
    `SELECT * FROM users LIMIT $1 OFFSET $2`,
    [limit, offset],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.get("/:id", function (req, res) {
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.post("/", function (req, res) {
  const { username, password } = req.body;
  pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ status: "success" });
    }
  );
});

router.delete("/:id", function (req, res) {
  pool.query(
    "DELETE FROM users WHERE id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ status: "success" });
    }
  );
});

router.put("/:id", function (req, res) {
  const { password } = req.body;
  pool.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [password, req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ status: "success" });
    }
  );
});

module.exports = router;
