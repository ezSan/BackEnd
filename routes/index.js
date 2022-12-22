const express = require("express");
const { route } = require("./menues");


const menuesRoutes = require("./menues");

const router = express.Router();

router.use("/menues", menuesRoutes);



module.exports = router;
