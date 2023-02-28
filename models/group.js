const mongoose = require("mongoose");
const Joi = require("joi");
const autoencrement = require("mongoose-sequence")(mongoose);

const groupSchema = new mongoose.Schema(
  {
    employeeID: {
      type: mongoose.Schema.Types.Number,
      ref: "Employee",
      require: true,
      trim: true,
    },
    courseID: {
      type: mongoose.Schema.Types.Number,
      ref: "course",
      required: true,
      trim: true,
    },
    groupName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
    groupSchedule: {
      type: [
        {
          days: {
            type: String,
            required: true,
          },
          Hourfrom: {
            type: String,
            required: true,
          },
          Hourto: {
            type: String,
            required: true,
          },
        },
      ],
    },
    groupStartData: {
      type: Date,
      required: true,
      trim: true,
    },
    creationDate: {
      type: Date,
      default: Date.now(),
      trim: true,
      required: true,
    },
    class: {
      type: String,
      enum: ["lab1", "lab2", "lab3", "lab4", "lab5", "lab6", "lab7"],
      trim: true,
    },
    groupType: {
      type: String,
      enum: ["classroom", "online"],
      trim: true,
    },
    groupStatus: {
      type: String,
      enum: ["panding", "working", "completed"],
      trim: true,
    },
  },
  { timestamps: true }
).plugin(autoencrement, { inc_field: "groupID" });

const Group = mongoose.model("groups", groupSchema);

// function validationGroup(group) {
  const Schema = Joi.object({
    employeeID: Joi.number().required().integer().positive(),
    courseID: Joi.number().required().integer().positive(),
    groupName: Joi.string().required().trim(),
    groupSchedule: Joi.array()
      .items(
        Joi.object({
          days: Joi.string().required(),
          Hourfrom: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
          Hourto: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
        })
      )
      .required(),
    groupStartDate: Joi.date().required().integer(),
    groupEndDate: Joi.date(),
    class: Joi.string().required().trim(),
    groupType: Joi.string().required().trim(),
    groupStatus: Joi.string().required().trim(),
  });
//   return schema.validate(group);
// }

exports.Group = Group;
exports.validate = validationGroup;
exports.Schema = Schema;
