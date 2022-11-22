const router = require("express").Router();
const mongoose = require("mongoose");
const { protect } = require("../controllers/authController");
const multer = require("multer");
const fs = require("fs");

const uploadSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    referenceId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Download",
    },
  },
  {
    timestamps: true,
  }
);
const Upload = mongoose.model("Upload", uploadSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.post("/", protect, uploads.single("file"), async (req, res, next) => {
  try {
    let data = await Upload.create({
      fileName: req.file.filename,
      uploadedBy: req.user.branch,
      referenceId: req.body.referenceId,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:referenceId", protect, async (req, res, next) => {
  try {
    let data = await Upload.find({
      referenceId: req.params.referenceId,
    }).populate("uploadedBy", "branchName branchCode").populate('referenceId')
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, async (req, res, next) => {
  try {
    let data = await Upload.find({ uploadedBy: req.user.branch }).populate(
      "referenceId",
      "title"
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    let data = await Upload.findByIdAndDelete(req.params.id);
    fs.unlinkSync(`./uploads/${data.fileName}`);
    res.status(200).json({ deleted: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
