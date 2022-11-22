const Branch = require("../models/branchModel");
const globalFuctions = require("../utils/globalFuctions");
const Auth = require("../models/authModel");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");
const multerS3 = require("multer-s3");
const multer = require("multer");
const aws = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

// aws.config.update({
//   region: "ap-southeast-1",
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_SECRET_KEY,
// });
// const s3 = new aws.S3();

// const upload = () =>
//   multer({
//     storage: multerS3({
//       s3,
//       bucket: process.env.AWS_BUCKET_NAME,
//       metadata: function (req, file, cb) {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//         cb(null, `image-${Date.now()}.jpeg`);
//       },
//     }),
//   });
const s3 = new aws.S3({
  endpoint: process.env.S3_END_POINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: "us-east-1",
  s3ForcePathStyle: true,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "test-test-com",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    key: function (req, file, cb) {
      var filename =
        file.originalname.replace(path.extname(file.originalname), "@") +
        Date.now() +
        path.extname(file.originalname);
      file.originalname = filename;
      cb(null, filename);
    },
    transforms: [
      {
        id: "original",
        key: function (req, file, cb) {
          cb(null, file.originalname);
        },
        transform: function (req, file, cb) {
          cb(null, new stream.PassThrough());
        },
      },
      {
        id: "thumbnail",
        key: function (req, file, cb) {
          cb(null, "thumb-" + file.originalname);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize({ width: 50, sigma: 0.3 }).png());
        },
      },
    ],
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
  const uploadSingle = upload().single("image-cover");
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      let data = await Branch.findByIdAndUpdate(
        req.user.branch._id,
        {
          imageCover: req.file.location,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      res.status(200).json({
        message: "image uploaded successfully",
        data,
      });
    }
  });
});

