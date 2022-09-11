const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Please add a course title"],
    },
    duration: {
      type: String,
      required: [true, "Please add a duration"],
    },
    url: {
      type: String,
      required: [true, "Please add a url"],
    },
    amount: {
      type: String,
      required: [true, "Please add an amount"],
    },
    courseFor: {
      type: String,
      required: [true, "Please define for whome "],
    },
    open: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: [true, "Please upload an image "],
    },
    details: {
      type: String,
      required: [true, "Please add course details"],
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
