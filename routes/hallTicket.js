const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/authController");
const HallTicket = require("../models/hallTicketModel");
const Student = require("../models/studentModel");
const Branch = require("../models/branchModel");
const Class = require("../models/classModel");

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
    const student = await Student.findOne({
      registerNo: req.body.registerNo,
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid Register Number" });
    }

    // Extract all the unique branch codes from the student data
    const branchCodes = [student.branchCode];

    // Fetch all the branches with the matching branch codes
    const branch = await Branch.findOne({ branchCode: student.branchCode });

    const classData = await Class.findOne({ className: student.className });

    let hallTicket = await HallTicket.findOne({ class: classData._id })
      .populate("exam")
      .populate("subjects.subjectId");

    const studentsWithBranchAndClassName = {
      ...student._doc,
      branchName: branch ? branch.branchName : null,
      className: classData ? classData.className : null,
    };
    console.log(studentsWithBranchAndClassName);
    return res
      .status(200)
      .json({ ...hallTicket._doc, data: studentsWithBranchAndClassName });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
