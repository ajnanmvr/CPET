const { protect } = require("../controllers/authController");
const branchController = require("../controllers/branchController");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post("/", protect, branchController.createBranch);
router.get("/", branchController.getAllBranches);
router.get("/:id", protect, branchController.getBranch);
router.patch("/:id", protect, branchController.editBranch);
router.post(
  "/upload-cover",
  protect,
  uploads.single("imageCover"),
  branchController.updateCoverImage
);
module.exports = router;
