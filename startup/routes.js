const express = require("express");
const student = require("../routes/students");
const employee = require("../routes/employee");
const branch = require("../routes/branch");
const auth = require("../routes/auth");
var morgan = require('morgan');
const winston = require("../config/winston");

const cors = require('cors')

module.exports = (app) => {

  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(morgan('combind', {stream: winston.stream}))
  
  app.use("/branch", branch);
  app.use("/students", student);
  app.use("/employee", employee);
  app.use("/auth", auth);
  // handle the request invalid
  require("./handlerror")(app);
};
