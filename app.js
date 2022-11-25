const express = require("express");

const router = require("./routes/index");


// middle
var bodyParser = require("body-parser");
const { json } = require("body-parser");



// iniciar express
const app = express();
app.use(bodyParser.json());

app.use("/", router)



app.listen(3000, () => {
  console.log("Servidor Iniciado correctamente");
});




