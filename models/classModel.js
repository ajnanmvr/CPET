const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, "Class Name is required field"],
    uppercase:true
  },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;