const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const HallTicket = require("../models/hallTicketModel");
const Student = require("../models/studentModel");

router.post("/", protect, restrictTo("superAdmin"), async (req, res) => {
  try {
    let data = await HallTicket.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    let data = await HallTicket.find()
      .populate("exam")
      .populate("class")
      .populate("subjects.subjectId");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    let data = await HallTicket.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let data = await HallTicket.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/download", async (req, res) => {
  try {
    let data = await Student.findOne({
      registerNo: req.body.registerNo,
    })
      .populate("branch", "branchName")
      .populate("class", "className");
    if (!data) {
      res.status(400).json({ message: "Invalid Register Number" });
    } else {
      let hallTicket = await HallTicket.findOne({ class: data.class })
        .populate("exam")
        .populate("class")
        .populate("subjects.subjectId");
      res.status(200).json({ ...hallTicket, data });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
