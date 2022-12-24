const jwt = require("jsonwebtoken");
const tokenKey = "secret";

const ValidacionJWTadmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const verificarToken = jwt.verify(token, tokenKey);
    console.log("tokken ", verificarToken.rolId, " <<<=");

    if (verificarToken.rolId == 2) {
      req.infoToken = verificarToken;
      console.log("auth by jwt!");
      return next();
    } else {
      res.status(401).json({ msj: "User unauthorized, because isn´t admin" });
    }
  } catch (error) {
    console.log("error ", error);
    res.status(401).json({ msj: "User unauthorized" });
  }
};

module.exports = ValidacionJWTadmin;
