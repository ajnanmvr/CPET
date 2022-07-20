const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    uppercase: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
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
  subjects: {
    type: Array,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    emum: ["male", "female"],
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
