const Branch = require("../models/branchModel");
const globalFuctions = require("../utils/globalFuctions");
const admin = require("firebase-admin");
const uuid = require("uuid-v4");
const dotenv = require("dotenv");
const Auth = require("../models/authModel");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");

dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SECRET)),
  storageBucket: "gs://cpet-2093a.appspot.com",
});

const bucket = admin.storage().bucket();

async function uploadFile(fileName1, fileName2) {
  try {
    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: "image/png",
      cacheControl: "public, max-age=31536000",
    };

    let data = await bucket.upload(fileName1, {
      gzip: true,
      metadata: metadata,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

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
  if (req.file) {
    let data = await Branch.create(req.body);
    let user = await Auth.create({ ...req.body, branch: data._id });
    await this.resizeImage(req.file, data._id, next);
    data.admin = user._id;
    data.save();
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Please upload an image" });
  }
});
exports.editBranch = async (req, res) => {
  try {
    let uploadData = null;
    if (req.file) {
      let data = await uploadFile(
        `${__dirname + "/uploads/" + req.file.filename}`
      );
      uploadData = data[1].mediaLink;
    } else {
      uploadData = req.body.image;
    }
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
