require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);
app.use("/api/auth", require("./api/auth"));
app.use("/api/orders", require("./api/orders"));
app.use("/api/products", require("./api/products"));
app.use("/api/users", require("./api/users"));

module.exports = app;
