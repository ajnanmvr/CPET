const { protect } = require("../controllers/authController");
const branchController = require("../controllers/branchController");
const router = require("express").Router();




router.post("/", protect, branchController.createBranch);
router.get("/", branchController.getAllBranches);
router.get("/:id", protect, branchController.getBranch);
router.post("/:id", protect, branchController.editBranch);

router.post("/branch/upload-cover/", protect, branchController.updateCoverImage);
module.exports = router;
