const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");


class OrderState extends Model {}

OrderState.init(
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "OrderState", // We need to choose the model name
    timestamps: false,
  }
);




OrderState.sync()
  .then((result) => {
    OrderState.findOrCreate({
      where: { state: "Confirmado" },
    });
    OrderState.findOrCreate({
      where: { state: "En preparación" },
    });
    OrderState.findOrCreate({
      where: { state: "En camino" },
    });
    OrderState.findOrCreate({
      where: { state: "Entregado!" },
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });

module.exports = OrderState;
