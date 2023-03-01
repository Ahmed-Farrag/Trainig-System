const router = require("express").Router();
// const { model } = require("mongoose");
const { Branch, Schema } = require("../models/branch");
const _ = require("lodash");
const validationMiddleware = require("../middleware/validation");

// 1. get route
router.get("/", async (req, res, next) => {
  // try and catch to handell code
  try {
    const branch = await Branch.find().sort("branchID").select("-_id -__v"); // select mean exclote : مش عايز دول يظهرو
    res.send(branch);
  } catch (error) {
    next(error);
  }
});

// 2. get by id
router.get("/:id", async (req, res, next) => {
  try {
    const branch = await Branch.find({ branchID: req.params.id });
    if (!branch) return res.status(404).send("the Branch not found");
    res.send(branch);
  } catch (error) {
    next(error);
  }
});

// 3. post : i need to make creation in db => need to call branchmodel
router.post("/", validationMiddleware(Schema), async (req, res, next) => {
  // run code her : validate
  try {
    // install lodash to mentain mycode : to didn't make req.body.name and address etc
    const branch = await Branch(
      _.pick(req.body, ["name", "address", "details", "ip"])
    );
    // if process have issue
    if (!branch) return res.status(404).send("error in the DB");
    // if okay
    res.send(branch);
  } catch (error) {
    next(error);
  }
});

// 3. put : to update
router.put("/:id", validationMiddleware(Schema), async (req, res, next) => {
  // run code her : validate
  try {
    // install lodash to mentain mycode : to didn't make req.body.name and address etc
    const updateBranch = await Branch.findOneAndUpdate(
      { branchID: req.body.id },
      _.pick(req.body, ["name", "address", "details", "ip"]),
      // to make validation on updated data
      { new: true, runValidators: true }
    );
    // if process have issue
    if (!updateBranch) return res.status(404).send("error in the DB");
    // if okay
    res.send(updateBranch);
  } catch (error) {
    next(error);
  }
});

// don't make delete case noone can belete my branch

module.exports = router;
