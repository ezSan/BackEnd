const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");
/* const User = require('./user'); */

class Rol extends Model {}

Rol.init(
  {
    // Model attributes are defined here
    rolId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Rol", // We need to choose the model name
    timestamps:false
  }
);



Rol.sync()
  .then((result) => {
    Rol.findOrCreate({
      where: { name: "ADMIN" },
      defaults: {
        name: "ADMIN",
      },
    });
    Rol.findOrCreate({
      where: { name: "CLIENTE" },
      defaults: {
        name: "CLIENTE",
      },
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });

module.exports = Rol;
