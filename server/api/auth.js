const express = require('express');
const app = express.Router();
const { User } = require('../db');
const { isUserValid } = require('./middleware/authMiddleWare');

module.exports = app;

app.post('/', isUserValid, async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get('/', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

app.post('/signup', isUserValid, async (req, res, next) => {
  User.encryptUser(req.body)
    .then((token) => res.status(201).json({ token }))
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Could not register user', error: err.message });
    });
});
