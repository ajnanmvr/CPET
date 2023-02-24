const mongoose = require("mongoose");

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
    // required: [true, "house name is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  fatherName: {
    type: String,
    uppercase: true,
    // required: [true, "father name is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  place: {
    type: String,
    uppercase: true,
    // required: [true, "place is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  district: {
    type: String,
    uppercase: true,
    // required: [true, "district is required"],
    maxLength: [30, "30 characters are allowed"],
  },
  postOffice: {
    type: String,
    uppercase: true,
    // required: [true, "post office is required"],
    maxLength: [100, "100 characters are allowed"],
  },
  pinCode: {
    type: String,
    // required: [true, "pincode is required"],
    maxLength: [10, "10 characters are allowed"],
  },
  state: {
    type: String,
    uppercase: true,
    // required: [true, "state is required"],
    maxLength: [30, "30 characters are allowed"],
  },
  registerNo: {
    type: String,
    uppercase: true,
    maxLength: [50, "50 characters are allowed"],
  },
  // dobDate: {
  //   type: String,
  //   required: [true, "DOB Date is required"],
  //   maxLength: [15, "15 characters are allowed"],
  // },
  // dobMonth: {
  //   type: String,
  //   required: [true, "DOB Month is required"],
  //   maxLength: [15, "15 characters are allowed"],
  // },
  // dobYear: {
  //   type: String,
  //   required: [true, "DOB year is required"],
  //   maxLength: [15, "15 characters are allowed"],
  // },
  phone: {
    type: String,
    maxLength: [15, "15 characters are allowed"],
  },
  branch: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please select a branch"],
    maxLength: [100, "100 characters are allowed"],
    ref: "Branch",
  },
  class: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please select a class"],
    ref: "Class",
  },
  academicYear: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
