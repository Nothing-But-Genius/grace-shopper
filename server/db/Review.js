
const conn = require('./conn');
const { INTEGER,  TEXT , STRING, UUID } = conn.Sequelize;
const Product = require("./Product");

const Review = conn.define('review', {
  // id: {
  //   type: INTEGER,
  //   primaryKey: true,
  //   allowNull:false,
  // },
  text: {
    type: STRING,
  },
  
});

// //Query all reviews of a product
// async function getProductWithReviews(productId) {
//   const product = await Product.findByPk(productId, {
//     include: Review,
//   });
//   return product;
// }

// getProductWithReviews(1).then((product) => {
//   console.log(product);
// })


// // Create review for a product
// async function createReview(productId, reviewText) {
//   const product = await Product.findByPk(productId);
//   if (!product) {
//     throw new Error('Product not found');
//   }

//   const review = await Review.create({
//     text: reviewText,
//   });

//   await product.addReview(review);

//   return review;
// }

// createReview(1, 'Great product!').then((review) => {
//   console.log('Review created:', review);
// });

module.exports = Review 
