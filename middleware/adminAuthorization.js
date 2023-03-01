// Authentication
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (req.user.role != "admin") {
    res.status(401).send("only admin can access");
    next();
  } else {
    next();
  }
};
