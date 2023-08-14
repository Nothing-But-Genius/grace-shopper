const router = require("express").Router();
const { Guest } = require("../db/guest");

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const guest = await Guest.findOne({
      where: {
        userId: token,
        isCart: true,
      },
    });
    res.send(guest);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
