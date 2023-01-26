const mongoose = require("mongoose");
const Joi = require("joi");
const autoencrement = require("mongoose-sequence")(mongoose);

const  empolyeesSchema = mongoose.Schema({

}, { timestamps: true }).plugin(autoencrement, { inc_field: "branchID" });


