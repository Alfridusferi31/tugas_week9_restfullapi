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
    `SELECT * FROM movies LIMIT $1 OFFSET $2`,
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
    "SELECT * FROM movies WHERE id = $1",
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
  const { title, genres, year } = req.body;
  pool.query(
    "INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3)",
    [title, genres, year],
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
    "DELETE FROM movies WHERE id = $1",
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
  const { year } = req.body;
  pool.query(
    "UPDATE movies SET year = $1 WHERE id = $2",
    [year, req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ status: "success" });
    }
  );
});

module.exports = router;
