var createError = require("http-errors");
var logger = require("../config/winston");

module.exports = function (app) {
  app.use(function (req, res, next) {
    next(createError(404));
  });
  appuse((error, req, res, next) => {
    logger.debug(error.message);
    res.status(500).json(err.message);
  });
};
