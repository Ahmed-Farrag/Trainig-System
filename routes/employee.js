const router = require("express").Router();
const { Emplyee, Schema } = require("../models/branch");
const _ = require("lodash");
const validationMiddleware = require("/middleware/validation");

router.get("/", async (req, res, next) => {
  try {
    const employee = await Emplyee.find()
      .sort("employeeID")
      .select("-_id -__v");
    res.send(employee);
  } catch (error) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const employee = await Emplyee.findOne({
      employeeID: req.params.id,
    }).select("-_id -_v");
    if (!employee)
      return res
        .status(404)
        .send("the employee with the given ID was not found");
    res.send(employee);
  } catch (error) {
    next(err);
  }
});

module.exports = router;
