const { protect } = require("../controllers/authController");
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
router.get("/", async (req, res, next) => {
  try {
    let data = await Transfer.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
