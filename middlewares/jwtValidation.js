const jwt = require("jsonwebtoken");
const tokenKey = "secret";



const ValidacionJWT = (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const verificarToken = jwt.verify(token, tokenKey);
      if (verificarToken) {
        req.infoToken = verificarToken;
        console.log('auth by jwt!')
        return next();
      }
    } catch (error) {
      res.status(401).json({"msj":"User unauthorized"});
    }
  }

  module.exports = ValidacionJWT