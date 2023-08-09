const express = require("express");
const router = express.Router();

const { User } = require("../db");

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (ex) {
    next(ex);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    res.send(await User.findByPk(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

router.post("/user", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.put("/user/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/user/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router; // Changed from app to router
