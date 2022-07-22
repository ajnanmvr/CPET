const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const {
  createNotification,
  getAllNotifications,
} = require("../controllers/notificationController");

router
  .route("/")
  .post(protect, restrictTo("superAdmin"), createNotification)
  .get(getAllNotifications);

module.exports = router;
