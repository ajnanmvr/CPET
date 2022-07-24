const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
const globalFuctions = require("../utils/globalFuctions");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

exports.createPaymentData = globalFuctions.createOne(Payment);
exports.getAllPayments = globalFuctions.getAll(Payment);
exports.getPayment = globalFuctions.getOne(Payment, "paidBranches.branch");
// exports.updatePayment = globalFuctions.updateOne(Payment);
exports.deletePayment = globalFuctions.deleteStatus(Payment);

exports.createOrderId = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    let data = await instance.orders.create(options);
    await Order.create({
      razorpayOrderId: data.id,
      amount: Math.floor(data.amount / 100),
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    let body = req.body.razorpayOrderId + "|" + req.body.razorpayPaymentId;

    let expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.razorpaySignature) {
      let data = await Order.findOneAndUpdate(
        {
          razorpayOrderId: req.body.razorpayOrderId,
        },
        { ...req.body, status: "paid" }
      );
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Payment Verification Failed" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getPaidDetails = async (req, res) => {
  try {
    let data = await Order.find({
      paymentId: req.params.id,
      status: "paid",
    }).populate("branch", "branchName");

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updatePaidBranch = async (req, res) => {
  try {
    let payment = await Payment.findById(req.params.id);
    if (payment) {
      let alreadyPaid = payment.paidBranches.find((item) => {
        return item.branch.toString() === req.body.branch;
      });
      if (!payment.amount < req.body.amount) {
        if (!alreadyPaid) {
          let data = await Payment.findByIdAndUpdate(req.params.id, {
            $push: { paidBranches: req.body },
          });
          res.status(200).json(data);
        } else {
          res.status(400).json({ error: "This branch already paid !" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
