const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidBranches: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Branch",
      },
    ],
    deadLine: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
