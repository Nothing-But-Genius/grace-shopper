const express = require("express");
const app = express.Router();
const { User } = require("../db");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (ex) {
    next(ex);
  }
});

app.post("/auth", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.update(req.body);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

app.get("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (ex) {
    next(ex);
  }
});

app.get("/cart/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.post("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put("/cart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (ex) {
    next(ex);
  }
});
