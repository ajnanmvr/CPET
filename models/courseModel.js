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
    amount: {
      type: String,
      required: [true, "Please add an amount"],
    },
    courseFor: {
      type: String,
      required: [true, "Please define for whome "],
    },
    image: {
      type: String,
      required: [true, "Please upload an image "],
    },
    details: {
      type: String,
      required: [true, "Please add course details"],
    },
    description: {
      type: String,
      required: [true, "Please add course details"],
    },
    learners: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CourseAccount",
        },
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
