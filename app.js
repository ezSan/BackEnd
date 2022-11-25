const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/nueva_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const router = require("./routes/index");

// middle
var bodyParser = require("body-parser");
const { json } = require("body-parser");

// iniciar express
const app = express();
app.use(bodyParser.json());

app.use("/", router);

app.listen(3000, () => {
  console.log("Servidor Iniciado correctamente");
});

/* esquemas y modelos */

const userSchema = new mongoose.Schema({
  usuario: String,
  nombreCompleto: String,
  email: String,
  tel: String,
  direccion: String,
  contraseña: String,
});

const User = mongoose.model("User", userSchema);

const eze = {
  usuario: "ezSan",
  nombreCompleto: "Ezequiel Sanchez",
  email: "ezsandev@gmail.com",
  tel: "2914413671",
  direccion: "Huaura 1315",
  contraseña: "ezequiel73",
};

let newUser = new User(eze);
newUser.save();

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Menu = mongoose.model("Menu", menuSchema);

const menuPrueba = {name:"Milanesa Napolitana", price: 1600}

let newMenu = new Menu(menuPrueba);
newMenu.save();

