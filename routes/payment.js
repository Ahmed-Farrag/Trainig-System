
const router = require('express').Router();
const _ = require('lodash');
const { Branch } = require('../models/branch')
const { Payment, schema } = require('../models/payment');
const { Employee } = require('../models/employees');
const { AssignStudent } = require('../models/assignStudent');
const { Course } = require('../models/courses');
const { Student } = require('../models/students');
const adminAuthorization = require('../middleware/adminAuthorization');
const auth = require('../middleware/auth');
const validateMiddelware = require('../middleware/validation')

router.get('/', async (req, res, next) => {
    try {
        const payments = await Payment.find();
        res.send(payments);
    } catch (err) {
        next(err);
    }
});


// send assignStudentID  to send totalpayment and remaining payment
router.get('/in/:id',  async (req, res, next) => {
    try {
        // There are a remaining Payment
        const assignStudent = await AssignStudent.findOne({ assignStudentID: req.params.id });
        if (!assignStudent) return res.send({ result: false, message: ' the assignStudent is not correct' });

        let totalPayment = await assignStudent.totalPayment;

        const inpayments = await Payment.find({ assignStudentID: req.params.id, tranactionType: 'in' });

        let inpaid = 0;
        if (inpayments) {
            for (const p of inpayments) { inpaid += p.paid; }
        }
        const outpayments = await Payment.find({ assignStudentID: req.params.id, tranactionType: 'out' });
        let outpaid = 0;
        if (outpayments)
        // get remaing from payment Hestory
        {
            for (const p of outpayments) { outpaid += p.paid; }
        }
        let remaingPayment = totalPayment - (inpaid - outpaid);

        res.send({ totalPayment: totalPayment, remaingPayment: remaingPayment });
    } catch (err) {
        next(err);
    }

});



router.get('/all/:id',  async (req, res, next) => {
    //payment history
    const payments = await Payment.find({ assignStudentID: req.params.id });
    res.send(payments);
});

router.get('/payment/:id', async (req, res, next) => {
    try {
        const payment = await Payment.findOne({ paymentID: req.params.id });
        if (!payment) return res.send({ result: false, message: 'the payment is not found' });
        res.send(payment);
    } catch (err) {
        next(err);
    }
});


router.post('/', validateMiddelware(schema), async (req, res, next) => {
    try {


        const employeeID = await Employee.findOne({ employeeID: req.body.employeeID });
        if (!employeeID) return res.send({ result: false, message: 'the employeeID is not correct' });

        const studentID = await Student.findOne({ studentID: req.body.studentID });
        if (!studentID) return res.send({ result: false, message: 'the studentID is not correct' });

        const assignStudent = await AssignStudent.findOne({ assignStudentID: req.body.assignStudentID, courseID: req.body.courseID });
        if (!assignStudent) return res.send({ result: false, message: ' the assignStudent is not correct' });

        const cousreID = await Course.findOne({ cousreID: req.body.cousreID });
        if (!cousreID) return res.send({ result: false, message: 'the cousreID is not correct' });

        let branchID = await Branch.findOne({ branchID: req.body.branchID });
        if (!branchID) return res.send({ result: false, message: 'the branch is not exist' });

        // هنا بيجيب الطالب عليه كام ودفع كام قبل كده بحيث لو ادفع اكتر من تمن الكورس يرفض او لو عمل سحب باكتر من اللي دفعه يرفض 

        const inpayments = await Payment.find({ assignStudentID: req.body.assignStudentID, courseID: req.body.courseID, tranactionType: 'in' });

        let totalPayment = await assignStudent.totalPayment;
        let inpaid = 0;
        if (inpayments) {
            for (const p of inpayments) { inpaid += p.paid; }
        }

        const outpayments = await Payment.find({ assignStudentID: req.body.assignStudentID, courseID: req.body.courseID, tranactionType: 'out' });
        let outpaid = 0;
        if (outpayments)
        // get remaing from payment History
        {
            for (const p of outpayments) { outpaid += p.paid; }
        }
        let remaingPayment = totalPayment - (inpaid - outpaid);

        if (req.body.tranactionType == 'in') {
            if (req.body.paid > remaingPayment) {
                return res.send({ result: false, message: `The Paid is More Than TotalPayment` });
            }
        } else {
            if (req.body.paid > (inpaid - outpaid)) {
                return res.send({ result: false, message: `The Refund is More Than Paid` });
            }
        }

        const payment = await new Payment(
            _.pick(req.body, [
                'employeeID',
                'studentID',
                'paid',
                'paymentType',
                'tranactionType',
                'courseID',
                'assignStudentID',
                'branchID',
                'comment'
            ]));



        await payment.save();

        res.send(payment);
    } catch (err) {
        next(err);
    }

});
module.exports = router;