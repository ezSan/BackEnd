const express = require("express");
const router = express.Router();
const sequelize = require("../db/connection");

/* const Producto = require("../models/producto"); */

router.get("/", (req, res) => {
  try {
    sequelize.models.Producto.findAll({ where: { status: "ACTIVE" } })
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
    let menu = sequelize.models.Producto.build({
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
    let productToPatch = req.params.id;
    let { nombre, precio, status } = req.body;

    
  } catch (error) {}

  // const mid = req.params.id; /* extraemos el id enviado a la ruta */
  // const { nombre, precio } = req.body; /* extraer los demás campos */

  // fs.readFile("menues.json", (err, data) => {
  //   if (err) {
  //     console.log("No sea ha podido leer el archivo", err);
  //   }

  //   const menues = JSON.parse(data); /* rescato el menu, de menues */

  //   menues.forEach((menu) => {
  //     if (menu.id === Number(mid)) {
  //       if (nombre != undefined) {
  //         menu.nombre = nombre;
  //       }
  //       if (precio != undefined) {
  //         menu.precio = precio;
  //       }

  //       const menueUpdated = JSON.stringify(menues, null, 2);

  //       fs.writeFile("menues.json", menueUpdated, (err) => {
  //         if (err) {
  //           console.log("Ha ocurrido un error al escribir el archivo");
  //         }

  //         return res.status(200).send("Menú modificado correctamente");
  //       });
  //     }
  //   });
  // });
});

router.delete("/:id", (req, res) => {
  const mid = req.params.id;

  fs.readFile("menues.json", (err, data) => {
    if (err) {
      console.log("Ha ocurrido un error al leer el fichero", err);
    }

    const menues = JSON.parse(data);

    menues.forEach((menu) => {
      if (menu.id === Number(mid)) {
        menues.splice(menues.indexOf(menu), 1);

        const menuDeleted = JSON.stringify(menues, null, 2);

        fs.writeFile("menues.json", menuDeleted, (err) => {
          if (err) {
            console.log("Ha ocurrido un error al escribir el archivo", err);
          }

          return res.status(200).send("Menú eliminado correctamente");
        });
      }
    });
  });
});

module.exports = router;
