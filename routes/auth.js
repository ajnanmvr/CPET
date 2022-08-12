const {
  signUp,
  signIn,
  logout,
  checkUserLoggedIn,
  createUser,
  restrictTo,
  protect,
  getAllUsers,
  getUser,
  createMultiUsers,
  getMyProfile,
  updatePassword,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/register", signUp);
router.post("/create-user", protect, restrictTo("superAdmin"), createUser);
router.post("/multi-user", protect, restrictTo("superAdmin"), createMultiUsers);
router.get("/users", protect, restrictTo("superAdmin"), getAllUsers);
router.get("/user/:id", protect, restrictTo("superAdmin"), getUser);
router.patch("/password/:id", protect, updatePassword);

router.post("/login", signIn);
router.post("/logout", logout);
router.post("/checkLogin", checkUserLoggedIn);
router.get("/profile", protect, getMyProfile);

module.exports = router;
