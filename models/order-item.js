const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const OrderItem = sequelize.define("order-item", {
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

module.exports = OrderItem;
