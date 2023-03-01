const router = require("express").Router();
const { Employee, Schema } = require("../models/employee");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const validationMiddleware = require("../middleware/validation");

router.post("/", async (req, res, next) => {
  try {
    // check it manuly
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
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
      .send(_.pick(user, ["email", "fullNameEnglish"]));
  } catch (error) {
    next(error);
  }
});


// to check am assign or not
function validate(req) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .min(3)
      .max(225)
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .required()
      .regex(/^([a-zA-Z-0-9]*)$/),
  });
  return schema.validate(req);
}
module.exports = router;
