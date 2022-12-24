

const ValidateUserData = (req, res, next) => {
    if (req.body.username && req.body.email && req.body.fullname && req.body.phone && req.body.address && req.body.password) {
      next();
    } else {
      res.status(400).json({"msj":"All fields are required"});
    }
  }


module.exports = ValidateUserData