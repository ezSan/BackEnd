const express = require("express");
const router = express.Router();
const sequelize = require("../db/connection");

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

router.post("/", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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
