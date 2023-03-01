const express = require("express");
const student = require("../routes/students");
const employee = require("../routes/employee");
const branch = require("../routes/branch");
const auth = require("/routes/auth");
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/branch", branch);
  app.use("/students", student);
  app.use("/employee", employee);
  app.use("/auth", auth);
};
