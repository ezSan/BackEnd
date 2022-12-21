const Product = require("./product");
const Item = require("./item");
const Order = require("./order");
const Rol = require("./rol");
const User = require("./user");
const Paymethod = require("./paymethod");
const OrderState = require("./orderState");

Item.belongsTo(Order, {
  foreignKey: "orderId",
});

Item.belongsTo(Product, {
  foreignKey: "productId",
});

User.belongsTo(Rol, {
  foreignKey: "rolId",
});

Order.belongsTo(Paymethod, {
  foreignKey: "paymethodId",
});

Order.belongsTo(OrderState, {
  foreignKey: "orderStateId",
});

Order.hasMany(Item, {
  foreignKey: "orderId",
});

User.hasOne(Order, {
  foreignKey: "userId",
});
