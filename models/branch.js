const mongoose = require("mongoose");
const Joi = require("joi");


const autoencrement = require("mongoose-sequence")(mongoose);

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    ip: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
).plugin(autoencrement, { inc_field: "branchID" });

const Branch = mongoose.model("branch", branchSchema);


function validateBranch(branch){
    const schema = Joi.object({
        name : Joi.string().required(),
        address : Joi.string().required(),
        details : Joi.string(),
        ip : Joi.string().required(),
    })
    return schema.validate(branch)
}

exports.Branch = Branch;
exports.validate = validateBranch;
