const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");


class Product extends Model {}

Product.init(
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    precio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Product", // We need to choose the model name
    timestamps:false
  }
);

module.exports = Product;
