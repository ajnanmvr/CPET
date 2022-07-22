const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  paymentId: {
    type: mongoose.Types.ObjectId,
    ref: "Payment",
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid"],
  },
  branch: {
    type: mongoose.Types.ObjectId,
    ref: "Branch",
  },
  razorpayPaymentId: String,
  razorpayOrderId: String,
  razorpaySignature: {
    type: String,
    select: false,
  },
  orderCreationId: String,
  amount: Number,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
