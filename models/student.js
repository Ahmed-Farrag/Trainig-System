const mongoose = require("mongoose");
const Joi = require("joi");
const autoencrement = require("mongoose-sequence")(mongoose);
const cities = require("full-countries-cities").getCities("egypt");
const validator = require("validator");

const studentsSchema = new mongoose.Schema(
  {
    employeeID: {
      type: mongoose.Schema.Types.Number,
      ref: "Employee",
      require: true,
      trim: true,
    },
    fullNameArabic: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
      minlength: 3,
    },
    fullNameEnglish: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
      minlength: 3,
      lowercase: true,
    },
    nationalID: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 14,
    },
    homeTel: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 10,
    },
    mobile1: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 11,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "ar-EG"),
        messege: "the mobile1 is not correct",
      },
    },
    mobile2: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 11,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "ar-EG"),
        messege: "the mobile2 is not correct",
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 255,
      minlength: 3,
      validate: {
        validator: (value) => validator.isEmail(value),
        messege: "the email is not correct",
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
      lowercase: true,
      trim: true,
    },
    studentsType: {
      type: String,
      require: true,
      trim: true,
      enum: ["individual", "corporate", "univeristy"],
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      enum: cities,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
      minlength: 5,
      lowercase: true,
    },
    creationDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },

  { timestamps: true }
).plugin(autoencrement, { inc_field: "studentID" });

const Student = mongoose.model("students", studentsSchema);

// function validationStudents(student) {
const Schema = Joi.object({
  employeeID: Joi.number().required().integer().positive(),
  fullNameArabic: Joi.string().required().max(255).min(3).trim(),
  fullNameEnglish: Joi.string().required().max(255).min(3).trim(),
  nationalID: Joi.string()
    .regex(/^([0-9]*)$/, { name: "numbers" })
    .length(14)
    .required()
    .trim(),
  homeTel: Joi.string()
    .regex(/^([0-9]*)$/, { name: "numbers" })
    .length(10)
    .trim(),
  mobile1: Joi.string()
    .regex(/^([0-9]*)$/, { name: "numbers" })
    .length(11)
    .required()
    .trim(),
  mobile2: Joi.string()
    .regex(/^([0-9]*)$/, { name: "numbers" })
    .length(11)
    .trim(),
  email: Joi.string().required().email({ minDomainSegments: 3 }).trim(),
  gender: Joi.string().required().lowercase().valid("male", "female").trim(),
  studentsType: Joi.string()
    .required()
    .lowercase()
    .valid("individual", "corporate", "univeristy")
    .trim(),
  city: Joi.string()
    .required()
    .valid(...cities)
    .trim(),
  address: Joi.string().required().max(255).min(5).trim(),
  branchID: Joi.number().required(),
});
// return schema.validate(student);
// }

exports.Student = Student;
// exports.validate = validationStudents;
exports.Schema = Schema;
