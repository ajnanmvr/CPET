const globalFunctions = require("../utils/globalFuctions");
const Notification = require("../models/notificationModel");

exports.createNotification = globalFunctions.createOne(Notification);