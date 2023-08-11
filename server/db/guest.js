const conn = require("./conn");
const { UUID, UUIDV4, BOOLEAN } = conn.Sequelize;
const Guest = conn.define("guest", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  isCart: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
});

module.exports = Guest;
