const express = require("express");
const router = express.Router();
const sequelize = require("../db/connection");


/* router.get("/", (req, res) => {
    try {
      sequelize.models.User.findAll()
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      res.status(400).json(error);
      console.error("Unable to connect to the database:", error);
    }
  }); */