const Exam = require("../models/examModel");

const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post("/", async (req, res, next) => {
  try {
    let data = await Exam.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/excel", uploads.single("file"), async (req, res, next) => {
  try {
    let data = await Exam.create({ ...req.body, excelFile: req.file.filename });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    let data = await Exam.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    let data = await Exam.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.patch("/:id", async (req, res, next) => {
  try {
    let data = await Exam.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    let data = await Exam.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
