const { default: mongoose, Schema } = require("mongoose");

const transferSchema = new Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    fromBranch: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    toBranch: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    reason: {
      type: String,
      required: [true, "Please describe the reason"],
      minLength: [100, "Please describe the reason in 100 words"],
    },
  },
  {
    timestamps: true,
  }
);

const Transfer = mongoose.model("Transfer", transferSchema);
module.exports = Transfer;
