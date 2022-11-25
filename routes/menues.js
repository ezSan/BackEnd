const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("menues.json", (error, file) => {
    if (error) {
      console.log("No se puede leer el archivo", error);
      return;
    }

    const menues = JSON.parse(file);
    return res.json(menues);
  });
});

router.post("/", (req, res) => {
  fs.readFile("menues.json", (err, data) => {
    if (err) {
      console.log("No se puede leer el archivo", err);
    }

    const menues = JSON.parse(data);

    const newMenuID = menues.length + 1;

    req.body.id = newMenuID;

    menues.push(req.body);

    /* Ya se agregó el menu al array */
    const newMenu = JSON.stringify(menues, null, 2);

    fs.writeFile("menues.json", newMenu, (err) => {
      if (err) {
        console.log("Ha ocurrido un error al escribir el archivo");
      }

      return res.status(200).send("Nuevo menu agregado");
    });
  });
});

router.patch("/:id", (req, res) => {
  const mid = req.params.id; /* extraemos el id enviado a la ruta */
  const { nombre, precio } = req.body; /* extraer los demás campos */

  fs.readFile("menues.json", (err, data) => {
    if (err) {
      console.log("No sea ha podido leer el archivo", err);
    }

    const menues = JSON.parse(data); /* rescato el menu, de menues */

    menues.forEach((menu) => {
      if (menu.id === Number(mid)) {
        if (nombre != undefined) {
          menu.nombre = nombre;
        }
        if (precio != undefined) {
          menu.precio = precio;
        }

        const menueUpdated = JSON.stringify(menues, null, 2);

        fs.writeFile("menues.json", menueUpdated, (err) => {
          if (err) {
            console.log("Ha ocurrido un error al escribir el archivo");
          }

          return res.status(200).send("Menú modificado correctamente");
        });
      }
    });
  });
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
