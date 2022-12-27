const express = require("express");
const { route } = require("./products");






const productRoutes = require("./products");

const userRoutes = require("./user");

const ordersRoutes = require("./orders");



const router = express.Router();

router.use("/products", productRoutes);
router.use("/user", userRoutes);
router.use("/orders", ordersRoutes);



module.exports = router;
