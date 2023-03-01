const router = require("express").Router();
const { Employee, Schema } = require("../models/employee");
const _ = require("lodash");
const bcrybt = require("bcrypt");
const validationMiddleware = require("../middleware/validation");
const auth = require("../middleware/auth");
const admin = require("../middleware/adminAuthorization");

router.get("/", [auth, admin], async (req, res, next) => {
  try {
    const employee = await Employee.find()
      .sort("employeeID")
      .select("-_id -__v");
    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      employeeID: req.params.id,
    }).select("-_id -_v");
    if (!employee)
      return res
        .status(404)
        .send("the employee with the given ID was not found");
    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.post("/", validationMiddleware(Schema), async (req, res, next) => {
  try {
    // check on nationalID and mobile becase it uniqe
    // regon to make cabslock to code
    //#region  
    const nationalID = await Employee.findOne({
      nationalID: req.body.nationalID,
    });
    if (nationalID) return res.status(400).send("the nationalID is exist");

    const mobile1 = await Employee.findOne({ mobile1: req.body.mobile1 });
    if (mobile1) return res.status(400).send("the nationalID is exist");

    const mobile2 = await Employee.findOne({ mobile2: req.body.mobile2 });
    if (mobile2) return res.status(400).send("the nationalID is exist");

    const email = await Employee.findOne({ email: req.body.email });
    if (email) return res.status(400).send("the nationalID is exist");
    //#endregion

    const employee = new Employee(
      _.pick(req.body, [
        "fullNameArabic",
        "fullNameEnglish",
        "nationalID",
        "homeTel",
        "mobile1",
        "mobile2",
        "email",
        "gender",
        "city",
        "address",
        "branchID",
        "role",
        "password",
      ])
    );
    // encrybt password
    const salt = await bcrybt.genSalt(10);
    employee.password = await bcrybt.hash(employee.password, salt);
    await employee.save();
    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validationMiddleware(Schema), async (req, res, next) => {
  try {
    const updateEmployee = await Employee.findOneAndUpdate(
      { employeeID: req.params.id },
      _.pick(req.body, [
        "fullNameArabic",
        "fullNameEnglish",
        "nationalID",
        "homeTel",
        "mobile1",
        "mobile2",
        "email",
        "gender",
        "city",
        "address",
        "branchID",
      ]),
      { new: true, runValidators: true }
    );
    if (!updateEmployee)
      return res
        .status(404)
        .send("the employee with the given ID was not found");
    res.send(updateEmployee);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
