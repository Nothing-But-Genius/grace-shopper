const conn = require('./conn');
const { STRING, UUID, UUIDV4 , INTEGER } = conn.Sequelize;

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  details: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }

  }
});

module.exports = Product;
