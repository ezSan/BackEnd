const express = require("express");
const { route } = require("./menues");


const menuesRoutes = require("./menues");
const userRoutes = require("./user");

const router = express.Router();

router.use("/menues", menuesRoutes);
router.use("/user", userRoutes);



module.exports = router;
