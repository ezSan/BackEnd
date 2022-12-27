const Product = require("./product");
const Order = require("./order");
const Rol = require("./rol");
const User = require("./user");
const Paymethod = require("./paymethod");
const OrderState = require("./orderState");
const Item = require("./item");

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

Order.hasMany(Item, {
  foreignKey: 'orderId'
});

/* RequiredProduct.belongsTo(Order, {
  foreignKey: "orderId",
});
 */


Item.belongsTo(Order, {
  foreignKey: 'orderId'
});

Item.belongsTo(Product, {
  foreignKey: 'productId'
});



/* RequiredProduct.belongsToMany(Product, { through: "ReqProdJunction" });

Product.belongsToMany(RequiredProduct, { through: "ReqProdJunction" }); */
