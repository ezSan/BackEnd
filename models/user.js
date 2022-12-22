const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    timestamps:false
  }
);


/*  User.sync()
  .then((result) => {
    User.findOrCreate({
      where: {
        username: "admin",
        fullname: "administrador",
        email: "admin@admin.com",
        phone: "123456",
        address: "Delillah resto",
        password: "admin"
      }
    });
  })
  .catch((error) => {
    console.error("Error", error);
  }); */


module.exports = User;
