
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');

const paymentSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    totalPayment: {
        type: Number,
    },
    remaing: {
        type: Number,
    },
    paid: {
        type: Number,
        required: true,
        trim: true,
        min: 1,

    },
    studentID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Student',
        required: true,
        trim: true,
    },
    courseID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Course',
        required: true,
        trim: true,
    },
    tranactionType: {
        type: String,
        required: true,
        trim: true,
        enum: ['in', 'out']
    },
    paymentType: {
        type: String,
        required: true,//VodafoneCash
        trim: true,
        enum: ['Cash', 'Visa', 'Fawry', 'BankTransfar', 'VodafoneCash', 'PayPal']
    },
    branchID: {
        type: mongoose.Schema.Types.Number,
        ref: 'branch',
        required: true,
        trim: true
    },
    assignStudentID: {
        type: mongoose.Schema.Types.Number,
        ref: 'assignStudent',
        required: true,
        trim: true
    },
    comment: {
        type: String
    },

    creationDate: {
        type: Date,
        default: new Date(),
        trim: true,
        required: true,
    },

},

).plugin(AutoIncrement, { inc_field: 'paymentID' });


const Payment = mongoose.model('payments', paymentSchema);


const schema = Joi.object()
    .keys({
        employeeID: Joi.number()
            .required()
            .integer()
            .positive(),
        courseID: Joi.number()
            .required()
            .integer()
            .positive(),
        totalPayment: Joi.number()
            .integer()
            .min(1)
            .max(5000),
        studentID: Joi.number().required(),
        branchID: Joi.number().required(),
        assignStudentID: Joi.number().required(),
        paid: Joi.number()
            .integer()
            .required()
            .min(1),

        tranactionType: Joi.string()
            .required(),
        paymentType: Joi.string()
            .required(),
        remaing: Joi.number()
            .integer()
            .min(1)
    });


exports.Payment = Payment;
exports.schema = schema;
