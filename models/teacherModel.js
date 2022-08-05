const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    uppercase: true,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  branch: {
    type: mongoose.Types.ObjectId,
    required: [true, "branch is required"],
    ref: "Branch",
  },
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
      required: [true, "subjects are required"],
    },
  ],
  gender: {
    type: String,
    required: [true, "gender is required"],
    emum: ["male", "female"],
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
