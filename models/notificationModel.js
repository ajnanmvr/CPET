const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["students", "admins"],
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
