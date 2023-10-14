const express = require("express");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const jwt = require("jsonwebtoken");

const app = express();

const validTokens = [];

const swaggerDefinition = {
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API for authentication and verification",
  },
  host: "localhost:3000",
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: ["*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/generate-token", (req, res) => {
  const token = jwt.sign(
    {
      userID: 31,
      role: "admin",
    },
    "koderahasiadarialfriduselman",
    { expiresIn: "1h" }
  );
  validTokens.push(token);

  res.json({
    token: token,
  });
});

app.get("/verify/:token", (req, res) => {
  const tokenToVerify = req.params.token;

  if (validTokens.includes(tokenToVerify)) {
    try {
      const decodedToken = jwt.verify(
        tokenToVerify,
        "koderahasiadarialfriduselman"
      );
      res.json({
        data: decodedToken,
      });
    } catch (error) {
      res.status(400).json({
        error: "Invalid token or token expired",
      });
    }
  } else {
    res.status(400).json({
      error: "Invalid token or token expired",
    });
  }
});

module.exports = app;
