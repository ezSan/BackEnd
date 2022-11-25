const express = require("express");

const menuesRoutes = require("./menues");


const router = express.Router();

router.use("/menues", menuesRoutes);


module.exports = router;
