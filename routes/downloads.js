const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const multer = require("multer");
const fs = require("fs");

const downloadSchema = new mongoose.Schema({
  fileName: { type: String, required: [true, "File is required"] },
  title: { type: String, required: [true, '"download" title is required'] },
  type: { type: String, required: true, enum: ["student", "admin"] },
});
const Download = mongoose.model("Download", downloadSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post("/", uploads.single("file"), async (req, res, next) => {
  try {
    let data = await Download.create({
      title: req.body.title,
      fileName: req.file.filename,
      type: req.body.type,
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    let data = await Download.find({ type: req.query.type });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/student", async (req, res, next) => {
  try {
    let data = await Download.find({ type: "student" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let data = await Download.findByIdAndDelete(req.params.id);
    fs.unlinkSync(`./uploads/${data.fileName}`);
    res.status(200).json({ deleted: true });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
