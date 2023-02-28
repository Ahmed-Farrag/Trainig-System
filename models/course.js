const mongoose = require("mongoose");
const Joi = require("joi");
const autoencrement = require("mongoose-sequence")(mongoose);
const cities = require("full-countries-cities").getCities("egypt");

const courseSchema = new mongoose.Schema(
  {
    employeeID: {
      type: mongoose.Schema.Types.Number,
      ref: "Employee",
      require: true,
      trim: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
      minlength: 3,
    },
    courseDesc: {
      type: String,
      trim: true,
      maxlength: 255,
      minlength: 5,
    },
    courseHours: {
      type: Number,
      required: true,
      trim: true,
      min: 5,
      max: 200,
    },
    coursePrice: {
      type: Number,
      required: true,
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
    },
    creationDate: {
      type: Date,
      default: Date.now(),
      trim: true,
      required: true,
    },
  },

  { timestamps: true }
).plugin(autoencrement, { inc_field: "studentID" });

const Course = mongoose.model("courses", Course);

// function validationStudents(course) {
  const Schema = Joi.object({
    employeeID: Joi.number().required().integer().positive(),
    courseName: Joi.string().required().max(255).min(3).trim(),
    courseDesc: Joi.string().max(255).min(5).trim(),
    courseHours: Joi.number()
      .required()
      .integer(),
      coursePrice: Joi.number(),
      priceAfterDiscount: Joi.number(),
  });
//   return schema.validate(course);
// }

exports.Course = Course;
exports.validate = validationStudents;
exports.Schema = Schema;
// exports.courseSchema = courseSchema;
