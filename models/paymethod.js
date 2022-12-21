const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class Paymethod extends Model {}

Paymethod.init(
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Paymethod", // We need to choose the model name
    timestamps: false,
  }
);

/* Paymethod.sync().catch((error) => {
  console.log("Error", error);
}); */

Paymethod.sync()
  .then((result) => {
    Paymethod.findOrCreate({
      where: { name: "Tarjeta de débito" },
    });
    Paymethod.findOrCreate({
      where: { name: "Tarjeta de crédito" },
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });

module.exports = Paymethod;
