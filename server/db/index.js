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
    Product.create({ name: 'Tank Top', details: 'This tank top is 100% combed and ringspun cotton. ', price: 50 , 
    imageUrl:"https://m.media-amazon.com/images/I/51vGg6BL4pL._AC_UY879_.jpg"}),
    Product.create({ name: 'Oversized Joggers', details: 'Classic style, versatile colours  no gym bag is complete without one', price: '23',
    imageUrl :"https://m.media-amazon.com/images/I/71NrnAZhwoL._AC_UX679_.jpg" }),
    Product.create({ name: 'Leggings', details: ' high-waisted fit, sweat-wicking fabric and seamless contours, constructed to ensure confidence and support for a workout', price: 27 ,
   imageUrl :"https://m.media-amazon.com/images/I/61q91u-nS6L._AC_UX569_.jpg"}),
    User.create({ username: 'ethyl', password: '123' }),
    User.create({ username: "spike", password: "tom", isAdmin: true }),
      
  ]);

  const product = await Product.create({
    name: 'Workout Hoodie',
    details: 'Minimalist design, maximum focus. this Hoodie will never let you down.',
    price: 100,
    imageUrl:"https://m.media-amazon.com/images/I/A19-FN3WZ0L._AC_UX679_.jpg"
  });

  const review = await Review.create({
    text: 'This workout hoodie is the best!',
    productId: product.id, 
  });

  const secondReview = await Review.create({
    text: 'Perfect to wear for a workout session!',
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
