const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    uppercase: true,
    required: true,
  },
  // email: {
  //   type: String,
  //   lowercase: true,
  //   required: true,
  //   validate: [validator.isEmail, "Please provide a valid email"],
  // },
  houseName: {
    type: String,
    uppercase: true,
    required: true,
  },
  fatherName: {
    type: String,
    uppercase: true,
    required: true,
  },
  motherName: {
    type: String,
    uppercase: true,
    required: true,
  },
  guardian: {
    type: String,
    uppercase: true,
    required: true,
  },
  place: {
    type: String,
    uppercase: true,
    required: true,
  },
  district: {
    type: String,
    uppercase: true,
    required: true,
  },
  postOffice: {
    type: String,
    uppercase: true,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    uppercase: true,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  admissionNo: {
    type: String,
    // unique: true,
  },
  aadhar: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Branch",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    enum: [
      "plus-one",
      "plus-two",
      "mahdiyya-first-year",
      "mahdiyya-second-year",
      "mahdiyya-third-year",
    ],
  },
  classTeacher: {
    type: String,
  },
  academicYear: {
    type: String,
  },
  certificateOne: String,
  certificateTwo: String,
  certificateThree: String,
  certificateFour: String,
  image: String,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
