const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
const globalFuctions = require("../utils/globalFuctions");
const Payment = require("../models/paymentModel");

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

const options = {
  amount: 50000, // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11",
};

exports.createPaymentData = globalFuctions.createOne(Payment);
exports.getAllPayments = globalFuctions.getAll(Payment);
exports.getPayment = globalFuctions.getOne(Payment)
exports.updatePayment = globalFuctions.updateOne(Payment);
exports.deletePayment = globalFuctions.deleteStatus(Payment);
