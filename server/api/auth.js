const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { isUserValid } = require("./middleware/authMiddleWare");
module.exports = app;

app.post("/", isUserValid, async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

app.get("/", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
app.post("/signup", isUserValid, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });

    if (!user) throw new Error("User creation failed");

    const token = user.generateToken();

    res.status(201).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not register user", error: err.message });
  }
});
