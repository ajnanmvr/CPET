const { protect } = require("../controllers/authController");
const branchController = require("../controllers/branchController");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.route.methods.patch && !file) return;
    cb(null, "./controllers/uploads");
  },
  filename: (req, file, cb) => {
    if (req.route.methods.patch && !file) return;
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post(
  "/",
  protect,
  uploads.single("branchImg"),
  branchController.createBranch
);
router.get("/", branchController.getAllBranches);
router.delete("/:id", protect, branchController.deleteBranch);
router.get("/:id", protect, branchController.getBranch);
router.patch(
  "/:id",
  protect,
  uploads.single("branchImg"),
  branchController.editBranch
);

module.exports = router;
