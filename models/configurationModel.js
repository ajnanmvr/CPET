const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema(
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
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Configuration = mongoose.model("Configuration", configurationSchema);
module.exports = Configuration;
