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
    deleted: { type: Boolean, default: false },
    paidBranches: [
      {
        branch: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Branch",
        },
        amount: {
          type: Number,
          required: true,
        },
        remarks: {
          type: String,
        },
        time: {
          type: Date,
          default: Date.now(),
        },
        studentCount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
paymentSchema.pre(/^find/, function (next) {
  //Effects all queries starts with FIND
  this.find({ deleted: { $ne: true } });
  next();
});
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
