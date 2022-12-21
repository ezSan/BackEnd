const express = require("express");

const router = require("./routes/index");

const db = require("./db/connection");

const relations = require('./models/relations');

/* const Producto = require('./models/producto');
const Item = require('./models/item');
const Pedido = require('./models/pedido');
const Rol = require('./models/rol');
const User = require('./models/user');
const MetodoPago = require('./models/metodoPago'); */




// middle
var bodyParser = require("body-parser");
const { json } = require("body-parser");


async function dbConnection() {
  try {
    await db.sync({force:false});
    console.log("La conexión a la Base de datos ha sido exitosa");
  } catch (error) {
    throw Error(error);
  }
}



// iniciar express
const app = express();
app.use(bodyParser.json());
app.use("/", router);

app.listen(3000, () => {
  console.log("Servidor Iniciado correctamente");
  dbConnection();
});
