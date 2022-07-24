const mongoose = require("mongoose");

const parentSubjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    uppercase:true
  },
});

const ParentSubject = mongoose.model("Parentsubject", parentSubjectSchema);
module.exports = ParentSubject;