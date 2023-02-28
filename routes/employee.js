const router = require("express").Router();
const { Emplyee, Schema } = require("../models/employee");
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

router.post("/", validationMiddleware(Schema), async (req, res, next) => {
  try {
    // check on nationalID and mobile becase it uniqe
    // regon to make cabslock to code
    //#region
    const nationalID = await Emplyee.findOne({
      nationalID: req.body.nationalID,
    });
    if (nationalID) return res.status(400).send("the nationalID is exist");

    const mobile1 = await Emplyee.findOne({ mobile1: req.body.mobile1 });
    if (mobile1) return res.status(400).send("the nationalID is exist");

    const mobile2 = await Emplyee.findOne({ mobile2: req.body.mobile2 });
    if (mobile2) return res.status(400).send("the nationalID is exist");

    const email = await Emplyee.findOne({ email: req.body.email });
    if (email) return res.status(400).send("the nationalID is exist");
    //#endregion

    const emploee = new Emplyee(
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
      ])
    );
    await emploee.save();
    res.send(emploee);
  } catch (error) {
    next(err);
  }
});

module.exports = router;
