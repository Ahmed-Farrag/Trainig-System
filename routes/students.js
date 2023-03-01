const router = require("express").Router();
const { Student, Schema } = require("../models/student");
const _ = require("lodash");
const validationMiddleware = require("../middleware/validation");

router.get("/", async (req, res, next) => {
  try {
    const student = await Student.find().select("-_id -__v").sort("studentID");
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findOne({
      studentID: req.params.id,
    }).select("-_id -_v");
    if (!student)
      return res
        .status(404)
        .send("the student with the given ID was not found");
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.post("/", validationMiddleware(Schema), async (req, res, next) => {
  try {
    //#region
    const nationalID = await student.findOne({
      nationalID: req.body.nationalID,
    });
    if (nationalID) return res.status(400).send("the nationalID is exist");

    const mobile1 = await student.findOne({ mobile1: req.body.mobile1 });
    if (mobile1) return res.status(400).send("the nationalID is exist");

    const mobile2 = await student.findOne({ mobile2: req.body.mobile2 });
    if (mobile2) return res.status(400).send("the nationalID is exist");

    const student = await student.findOne({ email: req.body.email });
    if (student) return res.status(400).send("the nationalID is exist");
    //#endregion

    student = new Student(
      _.pick(req.body, [
        "employeeID",
        "fullNameArabic",
        "fullNameEnglish",
        "nationalID",
        "homeTel",
        "mobile1",
        "mobile2",
        "email",
        "gender",
        "studentsType",
        "address",
        "city",
      ])
    );
    await student.save();
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validationMiddleware(Schema), async (req, res, next) => {
  try {
    const employeeID = await employee.findOne({
      employeeID: req.body.employeeID,
    });
    if (!employeeID) return res.status(400).send("the employeeID is not correct");

    const mobile2 = await Student.findOne({
      mobile2: req.body.mobile1,
    });
    if (!mobile2) return res.status(400).send("the mobile2 is not correct");

    const updateStudent = await Student.findOneAndUpdate(
      { studentID: req.params.id },
      _.pick(req.body, [
        "employeeID",
        "fullNameArabic",
        "fullNameEnglish",
        "nationalID",
        "homeTel",
        "mobile1",
        "mobile2",
        "email",
        "gender",
        "studentsType",
        "address",
        "city",
      ]),
      { new: true, runValidators: true }
    );
    if (!updateStudent)
      return res
        .status(404)
        .send("the student with the given ID was not found");
    res.send(updateStudent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
