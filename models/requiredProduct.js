const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");


class RequiredProduct extends Model {}

RequiredProduct.init(
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quant:{
        type: Sequelize.INTEGER
    },

    totalCost:{
        type: Sequelize.INTEGER
    }   
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "RequiredProducts", // We need to choose the model name
    timestamps:false
  }
);

module.exports = RequiredProduct;