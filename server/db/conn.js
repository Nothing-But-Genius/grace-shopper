const Sequelize = require('sequelize');

const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/acme_shopping_db',
  process.env.QUIET || { logging: false }
);

module.exports = conn;
