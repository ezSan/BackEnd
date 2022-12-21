const { model } = require("mongoose");
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(
  "mariadb://root:ezequiel@127.0.0.1:3307/dalillah_resto"
); 


module.exports = sequelize



