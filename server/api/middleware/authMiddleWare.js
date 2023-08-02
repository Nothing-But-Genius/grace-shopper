const isUserValid = (req, res, next) => {
  const { username, password } = req.body;
  if (
    !Boolean(
      username &&
        password &&
        typeof username === "string" &&
        typeof password === "string"
    )
  ) {
    return res.status(400).send("Invalid credentials");
  }
  next();
};

module.exports = { isUserValid };
