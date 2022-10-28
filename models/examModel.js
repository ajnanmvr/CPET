const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: [true, "Exam name is required"],
  },
  academicYear: {
    type: String,
    required: [true, "Academic year is required"],
  },
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
    },
  ],
  excelFile:{
    type:String
  }
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
