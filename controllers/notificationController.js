const globalFunctions = require("../utils/globalFuctions");
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);


exports.createNotification = globalFunctions.createOne(Notification);
exports.deleteNotification = globalFunctions.deleteOne(Notification);
exports.updateNotification = globalFunctions.updateOne(Notification);
exports.getAllNotifications = globalFunctions.getAll(Notification);
exports.getNotification = globalFunctions.getOne(Notification);
