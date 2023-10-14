const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const authRoutes = require("./routes/router");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(morgan("common"));
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRoutes);

const movies = require("./routes/movies.js");
app.use("/movies", movies);

const users = require("./routes/users.js");
app.use("/users", users);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
