const { request } = require("express");
const express = require("express");
const router = express.Router();
const sequelize = require("../db/connection");
const ValidateProductData = require("../middlewares/productControler");
const {ValidacionJWTadmin} = require("../middlewares/jwtValidation");
const jwt = require("jsonwebtoken");

/* const Producto = require("../models/producto"); */

router.get("/", (req, res) => {
  try {
    sequelize.models.Product.findAll({ where: { status: "ACTIVE" } })
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.error("Unable to connect to the database:", error);
  }
});

router.get("/:id", ValidacionJWTadmin, (req, res) => {
  let productId = req.params.id;

  try {
    sequelize.models.Product.findByPk(productId)
      .then((product) => {
        res.status(200).json(product);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.error("Unable to connect to the database:", error);
  }
});

router.post("/", ValidacionJWTadmin, ValidateProductData, (req, res) => {
  try {
    let menuToSave = req.body;
    let menu = sequelize.models.Product.build({
      nombre: menuToSave.nombre,
      precio: menuToSave.precio,
    });
    menu
      .save()
      .then((savedMenu) => {
        res.status(200).json(savedMenu);
      })
      .catch((error) => {
        res.status(400).json(error);
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.error("Unable to connect to the database:", error);
  }
});

router.patch("/:id", ValidacionJWTadmin, (req, res) => {
  try {
    let productId = req.params.id;
    let productToUpdate = req.body;

    sequelize.models.Product.findByPk(productId)
      .then((product) => {
        product.nombre = productToUpdate.nombre;
        product.precio = productToUpdate.precio;

        // actualiza product
        product
          .save()
          .then((updatedProduct) => {
            console.log('Producto actualizado correctamente')
            res.status(200).json(updatedProduct);
          })
          .catch((error) => {
            res.status(400).json(error);
            console.error("Unable to connect to the database:", error);
          });
      })
      .catch((error) => {
        res.status(400).json(error);
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {
    res.status(400).json(error);
    console.error("Unable to connect to the database:", error);
  }
});

router.delete("/:id", ValidacionJWTadmin, (req, res) => {
  try {
    let productId = req.params.id;
    sequelize.models.Product.findByPk(productId)
      .then((product) => {
        // delete la orden
        product.status = "INACTIVE";
        product
          .save()
          .then((productDeleted) => {
            res.status(200).json(productDeleted);
          })
          .catch((error) => {
            res.status(400).json(error);
            console.error("Unable to connect to the database:", error);
          });
      })
      .catch((error) => {
        res.status(400).json(error);
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {}
});

module.exports = router;
