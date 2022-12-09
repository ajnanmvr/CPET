const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const {
  createNotification,
  getAllNotifications,
  getNotification,
  deleteNotification,
} = require("../controllers/notificationController");

router
  .route("/")
  .post(protect, restrictTo("superAdmin"), createNotification)
  .get(getAllNotifications);
router
  .route("/:id")
  .get(getNotification)
  .post(protect, restrictTo("superAdmin"), deleteNotification);
module.exports = router;
