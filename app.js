const express = require("express");
const fs = require("fs");

// middle
var bodyParser = require("body-parser");
const { json } = require("body-parser");

// iniciar express
const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Servidor Iniciado correctamente");
});

app.get("/menues", (req, res) => {
  fs.readFile("menues.json", (error, file) => {
    if (error) {
      console.log("No se puede leer el archivo", error);
      return;
    }

    const menues = JSON.parse(file);
    return res.json(menues);
  });
});

app.post("/menues", (req, res) => {
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



app.patch('/menues:id' , (req,res)=>{

    const mid = req.params.id; /* extraemos el id enviado a la ruta */
    const {nombre,precio} = req.body; /* extraer los demás campos */

    fs.readFile('menues.json', (err,data)=>{
        if(err){
            console.log("No sea ha podido leer el archivo", err);
        }


        const menues = JSON.parse(data); /* rescato el menu, de menues */


        menues.forEach(menue=>{
            
        })

    })

})
