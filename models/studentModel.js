const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    uppercase: true,
    required: [true, "student name is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  houseName: {
    type: String,
    uppercase: true,
    required: [true, "house name is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  fatherName: {
    type: String,
    uppercase: true,
    required: [true, "father name is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  motherName: {
    type: String,
    uppercase: true,
    required: [true, "mother name is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  guardian: {
    type: String,
    uppercase: true,
    required: [true, "guardian is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  place: {
    type: String,
    uppercase: true,
    required: [true, "place is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  district: {
    type: String,
    uppercase: true,
    required: [true, "district is required"],
    maxLength: [30, "30 characters are allowed"],
  },
  postOffice: {
    type: String,
    uppercase: true,
    required: [true, "post office is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  pinCode: {
    type: String,
    required: [true, "pincode is required"],
    maxLength: [10, "10 characters are allowed"],
  },
  state: {
    type: String,
    uppercase: true,
    required: [true, "state is required"],
    maxLength: [30, "30 characters are allowed"],
  },
  dob: {
    type: String,
    required: [true, "DOB is required"],
    maxLength: [15, "15 characters are allowed"],
  },
  admissionNo: {
    type: String,
    // unique: true,
  },
  aadhar: {
    type: String,
    required: [true, "Aadhar Number is required"],
    maxLength: [20, "20 characters are allowed"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    maxLength: [15, "15 characters are allowed"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please select a branch"],
    maxLength: [100, "100 characters are allowed"],
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
    required: [true, "Please select a class"],
    maxLength: [25, "25 characters are allowed"],
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
