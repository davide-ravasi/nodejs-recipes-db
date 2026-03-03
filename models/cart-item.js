const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const CartItem = sequelize.define("cart-item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;
