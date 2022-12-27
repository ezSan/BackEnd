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
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    timestamps:false
  }
);

User.sync()
.then((user)=>{
  User.findOrCreate({
    where:{
      username:'admin',
      fullname:'Ezequiel Sanchez',
      email:'ezequiel.sanchez.7391@gmail.com',
      phone:'2914413671',
      address:'Huaura 1315',
      password:'acamica',
      rolId:'1'
    }
  })
  User.findOrCreate({
    where:{
      username:'cliente',
      fullname:'Usuario tipo cliente',
      email:'cliente@cliente.com',
      phone:'1223233123',
      address:'Calle falsa 123',
      password:'acamica',
      rolId:'2'
    }
  })
})
.catch((error)=>{
  console.error("Error", error)
})

module.exports = User;
