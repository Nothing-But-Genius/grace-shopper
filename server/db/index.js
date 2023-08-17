const conn = require("./conn");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const LineItem = require("./LineItem");
const Review = require("./Review");

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

Product.hasMany(Review)
Review.belongsTo(Product , { foreignKey: 'productId' })

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123' }),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    Product.create({ name: 'foo', details: 'tasty', price: '300' }),
    Product.create({ name: 'bar', details: 'Hasty', price: '23' }),
    Product.create({ name: 'bazz', details: 'resting', price: 27 }),
    User.create({ username: 'ethyl', password: '123' }),
    User.create({ username: "spike", password: "tom", isAdmin: true }),
      
  ]);

  const product = await Product.create({
    name: 'Testing',
    details: 'Testing Details',
    price: 100,
  });

  const review = await Review.create({
    text: 'Reviewing product is great!',
    productId: product.id, 
  });

  const secondReview = await Review.create({
    text: 'Reviewing 2nd product is great!',
    productId: product.id, 
  });
  
  

  const ethylCart = await ethyl.getCart();
  await ethyl.addToCart({ product: bazz, quantity: 3 });
  await ethyl.addToCart({ product: foo, quantity: 2 });

  const moeCart = await moe.getCart();
  await moe.addToCart({ product: bazz, quantity: 3 });
  await moe.addToCart({ product: foo, quantity: 2 });
  await moe.createOrder();

  return {
    users: {
      moe,
      lucy,
      larry,
    },
    products: {
      foo,
      bar,
      bazz,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
  Review,
};
