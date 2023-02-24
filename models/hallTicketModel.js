const mongoose = require("mongoose");

const HallTicketSchema = new mongoose.Schema({
  exam: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Exam",
  },
  class: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "Class",
  },
  subjects: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      time: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
});


const HallTicket = mongoose.model("HallTicket", HallTicketSchema);
module.exports = HallTicket;
