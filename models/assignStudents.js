const mongoose = require("mongoose");
const Joi = require("joi");
const autoencrement = require("mongoose-sequence")(mongoose);

const assignStudentSchema = new mongoose.Schema(
  {
    employeeID: {
      type: mongoose.Schema.Types.Number,
      ref: "Employee",
      require: true,
      trim: true,
    },
    studentID: {
      type: mongoose.Schema.Types.Number,
      ref: "students",
      required: true,
      trim: true,
    },
    groupID: {
      type: mongoose.Schema.Types.Number,
      ref: "group",
      trim: true,
    },
    courseID: {
      type: mongoose.Schema.Types.Number,
      ref: "course",
      required: true,
      trim: true,
    },

    totalPayment: {
      type: Number,
      required: true,
    },

    isCourseFinished: {
      type: Boolean,
      default: false,
    },
    creationDate: {
      type: Date,
      default: Date.now(),
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
).plugin(autoencrement, { inc_field: "assignStudentID" });

const assignStudent = mongoose.model("assignStudent", assignStudentSchema);

function validationAssignStudent(assignStudent) {
  const schema = Joi.object({
    employeeID: Joi.number().required(),
    studentID: Joi.number().required(),
    groupID: Joi.number(),
    courseID: Joi.number().required(),
    totalPayment: Joi.number().required(),
    isCourseFinished: Joi.boolean(),
  });
  return schema.validate(assignStudent);
}

exports.AssignStudent = assignStudent;
exports.validate = validationAssignStudent;

