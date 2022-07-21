const { protect, restrictTo } = require("../controllers/authController");
const {
  createPaymentData,
  getAllPayments,
  getPayment,
  updatePayment,
} = require("../controllers/paymentController");

const router = require("express").Router();

router.post("/", protect, restrictTo("superAdmin"), createPaymentData);
router.get("/", protect, restrictTo("superAdmin"), getAllPayments);
router.get("/:id", protect, restrictTo("superAdmin"), getPayment);
router
  .route("/:id")
  .get(protect, restrictTo("superAdmin"), getPayment)
  .patch(protect, restrictTo("superAdmin"), updatePayment);

module.exports = router;
