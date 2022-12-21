const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class Order extends Model {}

Order.init(
  {
    // Model attributes are defined here
    orderId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true,
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Order", // We need to choose the model name
    timestamps:false
  }
);

/* Order.sync().catch((error)=>{
  console.error('Error', error);
}); */

module.exports = Order;