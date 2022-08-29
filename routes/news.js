const router = require("express").Router();
const News = require("../models/newsModel");
const catchAsync = require("../utils/catchAsync");
const { protect, restrictTo } = require("../controllers/authController");
const dotenv = require("dotenv");
const multerS3 = require("multer-s3");
const multer = require("multer");
const aws = require("aws-sdk");
const { default: mongoose } = require("mongoose");

const newsCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please add a category name"],
  },
});

const NewsCategory = mongoose.model("NewsCategory", newsCategorySchema);

dotenv.config();

aws.config.update({
  region: "ap-southeast-1",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});
const s3 = new aws.S3();

const upload = () =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

router.post(
  "/",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res, next) => {
    const uploadSingle = upload().single("image");
    uploadSingle(req, res, async (err) => {
      if (!err) {
        let data = await News.create({
          ...req.body,
          image: req?.file?.location,
        });
        res.status(200).json(data);
      } else {
        res.status(400).json({ success: false, message: err.message });
      }
    });
  })
);
router.get(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await News.find().populate("category").sort("-createdAt");
    res.status(200).json(data);
  })
);
router.get(
  "/news-category",
  catchAsync(async (req, res, next) => {
    let data = await NewsCategory.find();
    res.status(200).json(data);
  })
);
router.patch(
  "/:id",
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const uploadSingle = upload().single("image");
    uploadSingle(req, res, async (err) => {
      if (!err) {
        let data = await News.findByIdAndUpdate(req.params.id, {
          ...req.body,
          image: req.file.location,
        });
        res.status(200).json(data);
      } else {
        res.status(400).json({ success: false, message: err.message });
      }
    });
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    let data = await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  })
);

router.post(
  "/news-category",
  protect,
  restrictTo("superAdmin"),
  catchAsync(async (req, res, next) => {
    let data = await NewsCategory.create(req.body);
    res.status(200).json(data);
  })
);
module.exports = router;
