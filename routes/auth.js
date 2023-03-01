const router = require("express").Router();
const { Employee, Schema } = require("../models/employee");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const validationMiddleware = require("../middleware/validation");

router.post("/", validationMiddleware(Schema), async (req, res, next) => {
  try {
    const user = await Employee.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("invalid email or password");
    }
    // password --> compare --> password in db
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).send("invalid email or password");
    }
    // User valid + Password Valid = Authenticated
    // Generate to token
    const token = user.generateToken();
    // Header of HTTP
    res
      .header("x-auth-token", token)
      .send(_.pich(user, ["email", "fullNameEnglish"]));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
