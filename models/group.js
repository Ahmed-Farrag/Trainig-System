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
    groupName:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
        unique: true,
    },
    groupSchedule:{
        type: [{
            days:{
                type: String,
                required: true,
            },
            Hourfrom: {
                type:String,
                required: true,
            },
            Hourto:{
                type:String,
                required: true,
            }
        }]
    },
    groupStartData:{
        type: Date,
        required: true,
        trim: true,
    },
    creationDate:{
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
    class:{
        type: String,
        enum:['lab1', 'lab2','lab3','lab4','lab5','lab6','lab7'],
        trim: true,
    }
  },
  { timestamps: true }
).plugin(autoencrement, { inc_field: "groupID" });
