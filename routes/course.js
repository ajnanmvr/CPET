const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const { protect, restrictTo } = require("../controllers/authController");
const Course = require("../models/courseModel");
const multer = require("multer");
const AppError = require("../utils/AppError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const uploads = multer({ storage: storage });
router.post(
  "/",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res, next) => {
    const uploadSingle = uploads.single("image");
    uploadSingle(req, res, async (err) => {
      if (!err) {
        let data = await Course.create({
          ...req.body,
          image: req.file.filename,
        });
        res.status(200).json(data);
      } else {
        next(new AppError("Error occured", 400));
      }
    });
  })
);

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await Course.find().sort("-createdAt");
    res.status(200).json(data);
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ deleted: true });
  })
);
router.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    let data = await Course.findById(req.params.id);
    res.status(200).json(data);
  })
);

module.exports = router;
