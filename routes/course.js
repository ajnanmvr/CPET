const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const { protect, restrictTo } = require("../controllers/authController");
const Course = require("../models/courseModel");
const dotenv = require("dotenv");
const multerS3 = require("multer-s3");
const multer = require("multer");
const aws = require("aws-sdk");
const AppError = require("../utils/AppError");

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
        let data = await Course.create({
          ...req.body,
          image: req?.file?.location,
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
    let data = await Course.find();
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

module.exports = router;
