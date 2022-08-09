const { protect, restrictTo } = require("../controllers/authController");
const Transfer = require("../models/transferModel");

const router = require("express").Router();

router.post("/:id", protect, async (req, res, next) => {
  try {
    if (req.user.branch.toString() === req.body.toBranch) {
      res.status(400).json({ message: "Please select another branch" });
    } else {
      let data = await Transfer.create({
        ...req.body,
        studentId: req.params.id,
        fromBranch: req.user.branch,
      });
      res.status(200).json(data);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/", protect, async (req, res, next) => {
  try {
    let data = await Transfer.find(req.query && req.query)
      .populate("studentId", "studentName admissionNo")
      .populate("toBranch", "branchName place district")
      .populate("fromBranch", "branchName place district")
      .sort("-createdAt");

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", protect, async (req, res, next) => {
  try {
    let data = await Transfer.findById(req.params.id)
      .populate("studentId", "studentName admissionNo aadhar phone")
      .populate("toBranch", "branchName place district ")
      .populate("fromBranch", "branchName place district")
      .sort("-createdAt");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.patch("/:id", protect, async (req, res, next) => {
  try {
    let data = await Transfer.findByIdAndUpdate(req.params.id, {
      accepted: req.body.accepted,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
// router.delete("/:id", protect, async (req, res, next) => {
//   try {
//     let data = await Transfer.findByIdAndDelete(req.params.id, {
//       fromBranch: req.user.branch,
//     });
//     res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
