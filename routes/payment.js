const { protect, restrictTo } = require("../controllers/authController");
const {
  createPaymentData,
  getAllPayments,
  getPayment,
  updatePayment,
  createOrderId,
  paymentSuccess,
  getPaidDetails,
} = require("../controllers/paymentController");

const router = require("express").Router();

router.post("/", protect, restrictTo("superAdmin"), createPaymentData);
router.get("/", protect, getAllPayments);

router.post("/success", protect, paymentSuccess);
router.post("/create-orderId", protect, createOrderId);
router
  .route("/:id")
  .get(protect, getPayment)
  .patch(protect, restrictTo("superAdmin"), updatePayment);
router.get(
  "/paid-details/:id",
  protect,
  restrictTo("superAdmin"),
  getPaidDetails
);
module.exports = router;
