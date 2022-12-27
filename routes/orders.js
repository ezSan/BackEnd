
const express = require("express");
const router = express.Router();
const sequelize = require("../db/connection");

router.get("/", (req, res) => {
    try {
      sequelize.models.Order.findAll()
        .then((orders) => {
          res.status(200).json(orders);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      res.status(400).json(error);
      console.error("Unable to connect to the database:", error);
    }
  });


router.post("/", (req, res) => {
    try {
        let orderToSave = req.body;
        console.log(req.infoToken)
        //Find pay method of order to save by primary key
        sequelize.models.PaymentMethod.findByPk(orderToSave.paymentMethodId).then((paymentMethod)=>{
            console.log( req.infoToken.id);
            const order =  sequelize.models.Order.build({ total: orderToSave.total, paymentMethodId: paymentMethod.id, clientId: req.infoToken.id });
                order.save().then((orderSaved) => {
                    let itemsToSave = orderToSave.items;
                    let promisesItem = [];
                    //product plus others product  result the sum of amounts by price and total
                    itemsToSave.forEach(itemToSave => {
                        let promiseItem = new Promise((resolve, reject) => {
                            sequelize.models.Product.findByPk(itemToSave.productId).then((product)=>{
                                const totalItem = product.price * itemToSave.amount;
                                const itemToAdd =  sequelize.models.Item.build({ amount: itemToSave.amount, total: totalItem, productId: product.id, orderId: order.id });
                                itemToAdd.save().then(savedItem =>{
                                    console.log(savedItem);
                                    let total = itemToSave.amount*product.price;
                                    resolve(total);
                                }).catch((error)=>{
                                    console.error('error adding product to order', error);
                                    reject(error);
                                });
                            }).catch((error)=>{
                                console.error('Error finding order:', error);
                                reject(error);
                            });
                        });
                        promisesItem.push(promiseItem);
                    });
                    Promise.all(promisesItem).then(values=>{
                        //Calculate total
                        const total = values.reduce(sumTotalItems);
                        orderSaved.set({
                            total: total
                        });
                        orderSaved.save().then(orderWithTotal=>{
                            sequelize.models.Order.findOne({
                                where: {
                                  id: orderWithTotal.id
                                },
                                include: [ { model: sequelize.models.Item, as: 'Items' } ]
                              }).then(findalOrder=>{
                                res.status(200).json(findalOrder);
                              }).catch((error)=>{
                                console.error('Error getting final order:', error);
                                res.status(400).json(error);
                            });
                        }).catch((error)=>{
                            console.error('Error saving order with total:', error);
                            res.status(400).json(error);
                        });
                    }).catch((error)=>{
                        console.error('Unable to connect to the database:', error);
                        res.status(400).json(error);
                    });
                }).catch((error)=>{
                    console.error('Unable to connect to the database:', error);
                    res.status(400).json(error);
                })
        }).catch((error)=>{
            console.error('Error finding paymentMethod:', error);
            res.status(400).json(error);
        });
    }catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(400).json(error);
    }
})


  module.exports = router;