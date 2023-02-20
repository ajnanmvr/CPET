const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const courseAccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    courses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

courseAccountSchema.pre("save", async function (next) {
  const otpToken = crypto.randomBytes(32).toString("hex"); //create a normal string
  this.otpToken = crypto //convert the resetToken to encrypted
    .createHash("sha256")
    .update(otpToken)
    .digest("hex");
  this.otpTokenExpires = Date.now() + 1 * 60 * 1000; //expires in 10 minutes
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
// bcrypt compare
courseAccountSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
courseAccountSchema.pre(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});
courseAccountSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); //create a normal string
  this.passwordResetToken = crypto //convert the resetToken to encrypted
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //expires in 10 minutes
  return resetToken;
};

const CourseAccount = mongoose.model("CourseAccount", courseAccountSchema);
module.exports = CourseAccount;
