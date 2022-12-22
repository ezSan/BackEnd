const Product = require("./product");
const Order = require("./order");
const Rol = require("./rol");
const User = require("./user");
const Paymethod = require("./paymethod");
const OrderState = require("./orderState");
const RequiredProduct = require("./requiredProduct");

User.belongsTo(Rol, {
  foreignKey: "rolId",
});

User.hasOne(Order, {
  foreignKey: "userId",
});

Order.belongsTo(Paymethod, {
  foreignKey: "paymethodId",
});

Order.belongsTo(OrderState, {
  foreignKey: "orderStateId",
});

RequiredProduct.belongsTo(Order, {
  foreignKey: "orderId",
});
RequiredProduct.belongsToMany(Product, { through: "ReqProdJunction" });

Product.belongsToMany(RequiredProduct, { through: "ReqProdJunction" });
