const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const courseAccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    houseName: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    place: {
      type: String,
    },
    district: {
      type: String,
    },
    postOffice: {
      type: String,
    },
    pincode: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    registrationId: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

courseAccountSchema.pre("save", async function (next) {
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
const CourseAccount = mongoose.model("CourseAccount", courseAccountSchema);
module.exports = CourseAccount;
