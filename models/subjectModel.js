const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    uppercase:true
  },
  parentSubject: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Subcategories",
  },
  // class: {
  //   type: String,
  //   required: true,
  // },
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
