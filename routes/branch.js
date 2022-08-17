const { protect } = require("../controllers/authController");
const branchController = require("../controllers/branchController");
const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();


router.post("/", protect, branchController.createBranch);
router.get("/", branchController.getAllBranches);
router.get("/:id", protect, branchController.getBranch);
router.patch("/:id", protect, branchController.editBranch);

router.post("/upload-cover/", branchController.updateCoverImage);
module.exports = router;
