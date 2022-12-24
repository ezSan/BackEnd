
const ValidateProductData = (req, res, next) => {
    if (req.body.nombre && req.body.precio) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  }


module.exports = ValidateProductData