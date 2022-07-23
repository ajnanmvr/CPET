const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const {
  createNotification,
  getAllNotifications,
  getNotification,
} = require("../controllers/notificationController");

router
  .route("/")
  .post(protect, restrictTo("superAdmin"), createNotification)
  .get(getAllNotifications);
router.route('/:id',).get(getNotification)
module.exports = router;
