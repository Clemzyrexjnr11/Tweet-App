const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authBearerToken = req.headers["authorization"];
  const token = authBearerToken.split(" ")[1]; 
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.json("invalid token");
      } else {
        req.user = user;
      }
    });
  }
  next();
}

module.exports = {authenticateToken};