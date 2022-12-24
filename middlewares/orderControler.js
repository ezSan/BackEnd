const ValidateOrderData =  (req, res, next) => {
    if (req.body.total && req.body.paymentMethodId && req.body.items) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  }

  module.exports = ValidateOrderData