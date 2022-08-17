const Branch = require("../models/branchModel");
const globalFuctions = require("../utils/globalFuctions");
const Auth = require("../models/authModel");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const S3 = require("aws-sdk/clients/s3");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const AWS = require("aws-sdk");

dotenv.config();

//configuring the AWS environment
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  s3ForcePathStyle:true,
  s3BucketEndpoint:true
});

// const s3 = new S3({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_SECRET_KEY,
// });
// upload file to s3
const upload = (fileName) => {
  const fileContent = fs.readFileSync(fileName);

  new AWS.S3().upload(
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fileContent,
      Key: "image.png",
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file uploaded successfully", data.Location);
      }
    }
  );
};

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
  upload(__dirname + "/uploads/image.png");
});
