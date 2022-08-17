const Branch = require("../models/branchModel");
const globalFuctions = require("../utils/globalFuctions");
const Auth = require("../models/authModel");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const multerS3 = require("multer-s3");
const multer = require("multer-s3");
const aws = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const s3 = new aws.S3({
  region: "ap-southeast-1",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
});

const upload = () =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

exports.resizeImage = (file, id, next) => {
  if (!file) return next();

  sharp(file.buffer)
    .resize({
      width: 500,
      height: 500,
    })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${id}.jpeg`);
};

exports.createBranch = catchAsync(async (req, res, next) => {
  let data = await Branch.create(req.body);
  let user = await Auth.create({ ...req.body, branch: data._id });
  data.admin = user._id;
  data.save();
  res.status(200).json(data);
});
exports.editBranch = async (req, res, next) => {
  try {
    let data = await Branch.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getBranch = globalFuctions.getOne(Branch);
exports.getAllBranches = globalFuctions.getAll(Branch);
exports.deleteBranch = globalFuctions.deleteOne(Branch);

exports.updateCoverImage = catchAsync(async (req, res, next) => {
  await upload().single("cover-image");
  res.status(200).json({ message: "image uploaded" });
});
