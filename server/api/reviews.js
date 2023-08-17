const express = require("express");
const router = express.Router();
const { Review, Product } = require("../db");


// GET All reviews based on product Id
router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
           const reviews = await Review.findAll({
        where: { productId },
      });
      res.json({ reviews });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });




// Create a new review
// router.post("/", async (req, res, next) => {
//   try {
//     const [newReview, created] = await Review.findOrCreate({
//       where: {
//         title: req.body.title,
//       },
//       defaults: req.body,
//     });
//     if (!created) {
//       return res.status(409).end();
//     }
//     res.status(201).send(newReview);
//   } catch (error) {
//     next(error);
//   }
// });

// Delete a review by ID
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const reviewId = req.params.id;
//     const review = await Review.findByPk(reviewId);

//     if (!review) {
//       return res.sendStatus(404).json({ message: "Review not found" });
//     }

//     await review.destroy();
//     res.sendStatus(204);
//   } catch (ex) {
//     next(ex);
//   }
// });

module.exports = router;