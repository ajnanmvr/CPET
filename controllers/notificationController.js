const globalFunctions = require("../utils/globalFuctions");
const Notification = require("../models/notificationModel");

exports.createNotification = globalFunctions.createOne(Notification);
exports.deleteNotification = globalFunctions.deleteStatus(Notification);
exports.updateNotification = globalFunctions.updateOne(Notification);
exports.getAllNotifications = globalFunctions.getAll(Notification);
exports.getNotification = globalFunctions.getOne(Notification);
