const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class Item extends Model {}

Item.init(
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Item", // We need to choose the model name
    timestamps:false
  }
);

module.exports = Item;
