const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "Please add a name"],
      type: String,
    },
    closed: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      required: [true, "Please add a deadline"],
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
