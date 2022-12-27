const { Sequelize, DataTypes, Model, QueryTypes } = require("sequelize");
const sequelize = require("../db/connection");

const ValidateUserData = require("../middlewares/userControler");

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
    timestamps: false,
  }
);

Product.sync()
  .then((result) => {
    Product.findOrCreate({
      where: { nombre: "Pizza napolitana", precio: "1500" },
    });
    Product.findOrCreate({
      where: { nombre: "Bondiola a la cerveza", precio: "2900" },
    });
    Product.findOrCreate({
      where: { nombre: "Matambrito de cerdo", precio: "1800" },
    });
    Product.findOrCreate({
      where: { nombre: "Pollo al verdeo", precio: "2400" },
    });
    Product.findOrCreate({
      where: { nombre: "Picada de mar", precio: "2100" },
    });
    Product.findOrCreate({
      where: { nombre: "Suprema con fritas", precio: "1700" },
    });
    Product.findOrCreate({
      where: { nombre: "Sorrentinos con salsa de hongos", precio: "2600" },
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });

module.exports = Product;
