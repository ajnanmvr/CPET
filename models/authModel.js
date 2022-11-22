const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      default: "admin",
      type: String,
      enum: ["admin", "superAdmin", "user"],
    },
    branch: {
      type: mongoose.Types.ObjectId,
      ref: "Branch",
    },
  },
  {
    timestamps: true,
  }
);
//BCRYPT
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
// bcrypt compare
authSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
authSchema.pre(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
