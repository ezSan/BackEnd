const express = require("express");
const { route } = require("./products");






const productRoutes = require("./products");

const userRoutes = require("./user");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/user", userRoutes);


module.exports = router;
